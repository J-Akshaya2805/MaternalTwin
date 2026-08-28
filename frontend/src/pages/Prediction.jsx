import { useEffect, useState } from "react";
import RiskScore from "../components/RiskScore";
import { getDashboardData } from "../services/api";

function Prediction() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardData()
      .then((data) => {
        setDashboard(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Prediction page error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="page">
        <h2>Loading prediction...</h2>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="page">
        <h2>Unable to load prediction data</h2>
      </div>
    );
  }

  const health = dashboard.health;

  // Convert ML risk category to a display score
  let riskScore = 20;

  if (health.maternalRisk === "mid risk") {
    riskScore = 50;
  } else if (health.maternalRisk === "high risk") {
    riskScore = 80;
  }

  return (
    <div className="page">

      <section className="page-heading">
        <div>
          <p className="page-label">
            AI RISK PREDICTION
          </p>

          <h2>Maternal Health Prediction</h2>

          <p>
            AI-based assessment of the current
            maternal and fetal health condition.
          </p>
        </div>
      </section>


      <section className="prediction-grid">

        <div className="simulation-card">

          <h3>Current Health Data</h3>

          <p>
            The prediction is based on the latest
            health information recorded for the patient.
          </p>


          <div className="slider-section">
            <div className="slider-title">
              <span>Mother Heart Rate</span>
              <strong>
                {health.motherHeartRate} bpm
              </strong>
            </div>
          </div>


          <div className="slider-section">
            <div className="slider-title">
              <span>Blood Pressure</span>
              <strong>
                {health.bloodPressure.systolic}/
                {health.bloodPressure.diastolic}
              </strong>
            </div>
          </div>


          <div className="slider-section">
            <div className="slider-title">
              <span>Fetal Heart Rate</span>
              <strong>
                {health.babyHeartRate} bpm
              </strong>
            </div>
          </div>


          <div className="slider-section">
            <div className="slider-title">
              <span>Baby Movement</span>
              <strong>
                {health.babyMovement}
              </strong>
            </div>
          </div>


          <div className="simulation-info">

            <strong>AI Prediction</strong>

            <p>
              Maternal Risk:{" "}
              <strong>{health.maternalRisk}</strong>
            </p>

            <p>
              Baby Status:{" "}
              <strong>{health.babyStatus}</strong>
            </p>

          </div>

        </div>


        <RiskScore score={riskScore} />

      </section>


      <section className="trajectory-card">

        <p className="page-label">
          PREDICTED TRAJECTORY
        </p>

        <h2>Current Health Projection</h2>


        <div className="trajectory">

          <div className="trajectory-point active">

            <span className="point"></span>

            <small>Today</small>

            <strong>
              Current State
            </strong>

          </div>


          <div className="trajectory-line"></div>


          <div className="trajectory-point">

            <span className="point"></span>

            <small>+48 Hours</small>

            <strong>
              Predicted Trend
            </strong>

          </div>


          <div className="trajectory-line"></div>


          <div className="trajectory-point">

            <span className="point"></span>

            <small>+7 Days</small>

            <strong>
              Projected State
            </strong>

          </div>

        </div>


        <div className="medical-note">

          This prototype provides AI-assisted decision
          support and simulated predictions. It should
          not be used as autonomous medical advice.

        </div>

      </section>

    </div>
  );
}

export default Prediction;