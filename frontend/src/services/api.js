const API_URL = "http://localhost:8000";

export const getHealthData = async () => {
  return {
    heartRate: 82,
    bloodPressure: "128/84",
    spo2: 98,
    temperature: 36.8,
    glucose: 104,
  };
};

export const getRiskPrediction = async () => {
  return {
    riskScore: 28,
    confidence: 94,
    status: "Low Risk",
  };
};

export const simulatePrediction = async (data) => {
  console.log("Simulation data:", data);

  return {
    predictedRisk: 28,
    trajectory: "Stable",
  };
};

export default API_URL;