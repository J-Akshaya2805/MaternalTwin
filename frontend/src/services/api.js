const API_URL = "http://10.1.17.232:5000";


// ========================================
// DASHBOARD DATA
// ========================================

export const getDashboardData = async () => {
  const response = await fetch(
    `${API_URL}/api/dashboard/MT001`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        result.error ||
        "Failed to fetch dashboard data"
    );
  }

  return result;
};


// ========================================
// SAVE HEALTH DATA
// ========================================

export const submitHealthData = async (healthData) => {
  const response = await fetch(
    `${API_URL}/api/health`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(healthData),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        result.error ||
        "Failed to save health data"
    );
  }

  return result;
};


// ========================================
// AI PREDICTION
// ========================================

export const getPrediction = async (healthData) => {
  const response = await fetch(
    `${API_URL}/api/predict`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(healthData),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        result.error ||
        "Prediction failed"
    );
  }

  return result;
};


// ========================================
// GET HEALTH HISTORY
// ========================================

export const getHealthHistory = async () => {
  const response = await fetch(
    `${API_URL}/api/health/MT001`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        result.error ||
        "Failed to fetch health history"
    );
  }

  return result;
};


export default API_URL;