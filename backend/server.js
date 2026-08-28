const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const healthRoutes = require("./routes/healthRoutes");
const patientRoutes = require("./routes/patientRoutes");
const predictionRoutes = require("./routes/predictionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/predict", predictionRoutes);
app.use("/api/dashboard", dashboardRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "MaternalTwin Backend is running",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`MaternalTwin Backend running on port ${PORT}`);
});
