import { useState } from "react";
import RiskScore from "../components/RiskScore";

function Prediction() {
  const [sleep, setSleep] = useState(5);
  const [activity, setActivity] = useState(20);

  const calculatedRisk = Math.round(
    Math.max(
      12,
      Math.min(
        75,
        45 -
          (sleep - 5) * 4 -
          (activity - 20) * 0.2
      )
    )
  );

  return (
    <div className="page">
      <section className="page-heading">
        <div>
          <p className="page-label">
            COUNTERFACTUAL SIMULATION
          </p>

          <h2>What-If Prediction</h2>

          <p>
            Modify health factors to simulate possible
            future maternal health trajectories.
          </p>
        </div>
      </section>

      <section className="prediction-grid">
        <div className="simulation-card">
          <h3>Create Simulation Scenario</h3>

          <p>
            Adjust the parameters to observe how the
            predicted risk may change.
          </p>

          <div className="slider-section">
            <div className="slider-title">
              <span>Average Sleep</span>
              <strong>{sleep} hours/day</strong>
            </div>

            <input
              type="range"
              min="4"
              max="10"
              value={sleep}
              onChange={(e) =>
                setSleep(Number(e.target.value))
              }
            />
          </div>

          <div className="slider-section">
            <div className="slider-title">
              <span>Daily Activity</span>
              <strong>{activity} min/day</strong>
            </div>

            <input
              type="range"
              min="0"
              max="60"
              step="5"
              value={activity}
              onChange={(e) =>
                setActivity(Number(e.target.value))
              }
            />
          </div>

          <div className="simulation-info">
            <strong>Simulation Insight</strong>

            <p>
              The digital twin compares the current
              trajectory with the simulated scenario
              to estimate a potential risk change.
            </p>
          </div>
        </div>

        <RiskScore score={calculatedRisk} />
      </section>

      <section className="trajectory-card">
        <p className="page-label">
          PREDICTED TRAJECTORY
        </p>

        <h2>7-Day Health Projection</h2>

        <div className="trajectory">
          <div className="trajectory-point active">
            <span className="point"></span>
            <small>Today</small>
            <strong>Current State</strong>
          </div>

          <div className="trajectory-line"></div>

          <div className="trajectory-point">
            <span className="point"></span>
            <small>+48 Hours</small>
            <strong>Predicted Trend</strong>
          </div>

          <div className="trajectory-line"></div>

          <div className="trajectory-point">
            <span className="point"></span>
            <small>+7 Days</small>
            <strong>Projected State</strong>
          </div>
        </div>

        <div className="medical-note">
          This prototype provides decision support and
          simulated predictions. It should not be used
          as autonomous medical advice.
        </div>
      </section>
    </div>
  );
}

export default Prediction;