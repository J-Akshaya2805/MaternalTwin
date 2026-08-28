const express = require("express");
const HealthRecord = require("../models/HealthRecord");

const router = express.Router();

// Add health record
router.post("/", async (req, res) => {
  try {
    const healthData = new HealthRecord(req.body);

    const savedRecord = await healthData.save();

    res.status(201).json({
      message: "Health record saved successfully",
      data: savedRecord,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to save health record",
      error: error.message,
    });
  }
});

// Get health records for a patient
// Get health records for a patient
router.get("/:patientId", async (req, res) => {
  try {
    const records = await HealthRecord.find({
      patientId: req.params.patientId,
    }).sort({ createdAt: -1 });

    if (records.length === 0) {
      return res.status(404).json({
        message: "No health records found for this patient",
      });
    }

    res.json({
      message: "Health records retrieved successfully",
      patientId: req.params.patientId,
      latestRecord: records[0],
      records: records,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve health records",
      error: error.message,
    });
  }
});

module.exports = router;
