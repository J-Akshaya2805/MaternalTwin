const express = require("express");
const axios = require("axios");
const HealthRecord = require("../models/HealthRecord");

const router = express.Router();

// Predict maternal and baby health
router.post("/", async (req, res) => {
  try {
    const healthData = req.body;

    // 1. Send data to ML service
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

    // 2. Call Python ML API
    const mlResponse = await axios.post(
      "https://overspend-founder-driving.ngrok-free.dev/predict",
      mlData,
    );

    const prediction = mlResponse.data;

    console.log("ML response:");
    console.log(prediction);

    // 3. Save health data + prediction as a new record
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
      babyAlerts: prediction.baby_alerts,
    });

    const savedRecord = await healthRecord.save();

    // 4. Send result to frontend
    res.json({
      message: "Prediction generated and health record saved successfully",

      prediction: prediction,

      recordId: savedRecord._id,
    });
  } catch (error) {
    console.error("Prediction error:", error.message);

    res.status(500).json({
      message: "Prediction failed",
      error: error.response?.data || error.message,
    });
  }
});

module.exports = router;
