import { useEffect, useState } from "react";

import { getDashboardData } from "../services/api";

import VitalCard from "../components/VitalCard";
import RiskScore from "../components/RiskScore";
import HealthChart from "../components/HealthChart";
import AlertPanel from "../components/AlertPanel";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getDashboardData()
      .then((data) => {
        console.log("Dashboard data:", data);
        setDashboard(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Dashboard error:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  // Loading screen
  if (loading) {
    return (
      <div className="page">
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  // Error screen
  if (error || !dashboard) {
    return (
      <div className="page">
        <h2>Unable to load dashboard data</h2>
        <p>Please check that the backend is running.</p>
      </div>
    );
  }

  const patient = dashboard.patient;
  const health = dashboard.health;

  return (
    <div className="page">

      {/* PATIENT OVERVIEW */}
      <section className="welcome-section">
        <div>
          <p className="page-label">
            PATIENT OVERVIEW
          </p>

          <h2>Good morning, Dr. Sarah</h2>

          <p>
            Here is the latest overview of the
            maternal and fetal health status.
          </p>
        </div>

        <div className="patient-card">
          <div className="patient-avatar">
            {patient.name
              ? patient.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase()
              : "PT"}
          </div>

          <div>
            <strong>{patient.name}</strong>

            <span>
              {patient.gestationalWeek} Weeks
            </span>
          </div>

          <button>
            View Profile →
          </button>
        </div>
      </section>


      {/* VITAL CARDS */}
      <section className="vitals-grid">

        <VitalCard
          title="Heart Rate"
          value={health.motherHeartRate}
          unit="bpm"
          icon="♥"
          status="Normal"
          trend="Latest"
        />

        <VitalCard
          title="Blood Pressure"
          value={`${health.bloodPressure.systolic}/${health.bloodPressure.diastolic}`}
          unit="mmHg"
          icon="↗"
          status="Monitor"
          trend="Latest"
        />

        <VitalCard
          title="Blood Glucose"
          value={health.bloodGlucose}
          unit="mmol/L"
          icon="◉"
          status="Normal"
          trend="Latest"
        />

        <VitalCard
          title="Temperature"
          value={health.temperature}
          unit="°F"
          icon="◌"
          status="Normal"
          trend="Latest"
        />

      </section>


      {/* CHART + RISK */}
      <section className="dashboard-grid">

        <HealthChart />

        <RiskScore
          score={
            health.maternalRisk === "mid risk"
              ? 50
              : health.maternalRisk === "high risk"
              ? 80
              : 20
          }
        />

      </section>


      {/* HEALTH OVERVIEW */}
      <section className="health-overview-grid">

        {/* MOTHER */}
        <div className="overview-card">

          <div className="section-header">

            <div>
              <p>MATERNAL STATUS</p>

              <h2>Mother's Health</h2>
            </div>

            <span className="stable-badge">
              ● {health.maternalRisk}
            </span>

          </div>


          <div className="health-metrics">

            <div className="metric-row">

              <div>
                <span>Heart Rate</span>

                <strong>
                  {health.motherHeartRate} bpm
                </strong>
              </div>

              <div className="metric-progress">
                <span style={{ width: "70%" }}></span>
              </div>

            </div>


            <div className="metric-row">

              <div>
                <span>Blood Pressure</span>

                <strong>
                  {health.bloodPressure.systolic} /{" "}
                  {health.bloodPressure.diastolic}
                </strong>
              </div>

              <div className="metric-progress">
                <span style={{ width: "75%" }}></span>
              </div>

            </div>


            <div className="metric-row">

              <div>
                <span>Blood Glucose</span>

                <strong>
                  {health.bloodGlucose}
                </strong>
              </div>

              <div className="metric-progress">
                <span style={{ width: "60%" }}></span>
              </div>

            </div>


            <div className="metric-row">

              <div>
                <span>Temperature</span>

                <strong>
                  {health.temperature} °F
                </strong>
              </div>

              <div className="metric-progress">
                <span style={{ width: "80%" }}></span>
              </div>

            </div>

          </div>

        </div>


        {/* BABY */}
        <div className="overview-card">

          <div className="section-header">

            <div>
              <p>FETAL STATUS</p>

              <h2>Baby's Health</h2>
            </div>

            <span className="week-badge">
              {health.gestationalWeek} Weeks
            </span>

          </div>


          <div className="baby-status">

            <div className="baby-item">

              <span>♥</span>

              <div>
                <p>Fetal Heart Rate</p>

                <strong>
                  {health.babyHeartRate} bpm
                </strong>
              </div>

            </div>


            <div className="baby-item">

              <span>↗</span>

              <div>
                <p>Baby Status</p>

                <strong>
                  {health.babyStatus}
                </strong>
              </div>

            </div>


            <div className="baby-item">

              <span>◉</span>

              <div>
                <p>Movement</p>

                <strong>
                  {health.babyMovement}
                </strong>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ALERTS */}
      <AlertPanel />

    </div>
  );
}

export default Dashboard;