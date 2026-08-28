const express = require("express");
const Patient = require("../models/Patient");

const router = express.Router();

// Create patient
router.post("/", async (req, res) => {
  try {
    const patient = new Patient(req.body);

    const savedPatient = await patient.save();

    res.status(201).json({
      message: "Patient created successfully",
      data: savedPatient,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create patient",
      error: error.message,
    });
  }
});

// Get all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });

    res.json({
      message: "Patients retrieved successfully",
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve patients",
      error: error.message,
    });
  }
});

// Get one patient
router.get("/:patientId", async (req, res) => {
  try {
    const patient = await Patient.findOne({
      patientId: req.params.patientId,
    });

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.json({
      message: "Patient retrieved successfully",
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve patient",
      error: error.message,
    });
  }
});

module.exports = router;
