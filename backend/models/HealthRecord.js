const mongoose = require("mongoose");

const healthRecordSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
    },

    // Mother
    motherAge: {
      type: Number,
      required: true,
    },

    gestationalWeek: {
      type: Number,
      required: true,
    },

    bloodPressure: {
      systolic: Number,
      diastolic: Number,
    },

    motherHeartRate: {
      type: Number,
    },

    temperature: {
      type: Number,
    },

    bloodGlucose: {
      type: Number,
    },

    hemoglobin: {
      type: Number,
    },

    // Baby
    babyHeartRate: {
      type: Number,
    },

    babyMovement: {
      type: Number,
    },

    // Pregnancy
    amnioticFluidIndex: {
      type: Number,
    },
    // AI Prediction
    maternalRisk: {
      type: String,
    },

    babyStatus: {
      type: String,
    },

    babyAlerts: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("HealthRecord", healthRecordSchema);
