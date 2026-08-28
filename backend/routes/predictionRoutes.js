const express = require("express");
const axios = require("axios");
const HealthRecord = require("../models/HealthRecord");

const router = express.Router();

// ==========================================
// PREDICT + SAVE HEALTH RECORD
// ==========================================
router.post("/", async (req, res) => {
  try {
    const healthData = req.body;

    console.log("Received health data:");
    console.log(healthData);

    // ------------------------------------------
    // 1. Prepare data for ML model
    // ------------------------------------------

    const mlData = {
      age: healthData.motherAge,
      systolic_bp: healthData.bloodPressure?.systolic,
      diastolic_bp: healthData.bloodPressure?.diastolic,
      blood_sugar: healthData.bloodGlucose,
      body_temp: healthData.temperature,
      heart_rate: healthData.motherHeartRate,
      fetal_heart_rate: healthData.babyHeartRate,
      movement_count: healthData.babyMovement,
      amniotic_fluid: healthData.amnioticFluidIndex,
    };

    console.log("Sending data to ML service:");
    console.log(mlData);

    // ------------------------------------------
    // 2. Call Python ML API
    // ------------------------------------------

    const mlResponse = await axios.post(
      "https://overspend-founder-driving.ngrok-free.dev/predict",
      mlData,
    );

    const prediction = mlResponse.data;

    console.log("ML response:");
    console.log(prediction);

    // ------------------------------------------
    // 3. Save ONE health record
    // ------------------------------------------

    const healthRecord = new HealthRecord({
      patientId: healthData.patientId,

      // Mother
      motherAge: healthData.motherAge,
      gestationalWeek: healthData.gestationalWeek,

      bloodPressure: {
        systolic: healthData.bloodPressure?.systolic,
        diastolic: healthData.bloodPressure?.diastolic,
      },

      motherHeartRate: healthData.motherHeartRate,

      temperature: healthData.temperature,

      bloodGlucose: healthData.bloodGlucose,

      hemoglobin: healthData.hemoglobin,

      // Baby
      babyHeartRate: healthData.babyHeartRate,

      babyMovement: healthData.babyMovement,

      // Pregnancy
      amnioticFluidIndex: healthData.amnioticFluidIndex,

      // AI Prediction
      maternalRisk: prediction.maternal_risk,

      babyStatus: prediction.baby_status,

      babyAlerts: prediction.baby_alerts || [],
    });

    const savedRecord = await healthRecord.save();

    console.log("Health record saved:", savedRecord._id);

    // ------------------------------------------
    // 4. Return result to frontend
    // ------------------------------------------

    res.status(201).json({
      message: "Health data submitted successfully",

      prediction: {
        maternal_risk: prediction.maternal_risk || "Unknown",

        baby_status: prediction.baby_status || "Unknown",

        baby_alerts: prediction.baby_alerts || [],
      },

      recordId: savedRecord._id,
    });
  } catch (error) {
    console.error("Prediction error:", error.response?.data || error.message);

    res.status(500).json({
      message: "Prediction failed",

      error: error.response?.data || error.message,
    });
  }
});

module.exports = router;
