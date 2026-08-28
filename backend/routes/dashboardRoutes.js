const express = require("express");
const Patient = require("../models/Patient");
const HealthRecord = require("../models/HealthRecord");

const router = express.Router();

// ==========================================
// GET COMPLETE DASHBOARD DATA
// ==========================================

router.get("/:patientId", async (req, res) => {
  try {
    const patientId = req.params.patientId;

    // Find patient
    const patient = await Patient.findOne({
      patientId,
    });

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    // Get latest health record
    const latestHealth = await HealthRecord.findOne({
      patientId,
    }).sort({
      createdAt: -1,
    });

    if (!latestHealth) {
      return res.status(404).json({
        message: "No health records found",
      });
    }

    // Return dashboard data
    res.json({
      message: "Dashboard data retrieved successfully",

      patient,

      health: latestHealth,
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    res.status(500).json({
      message: "Failed to retrieve dashboard data",

      error: error.message,
    });
  }
});

module.exports = router;
