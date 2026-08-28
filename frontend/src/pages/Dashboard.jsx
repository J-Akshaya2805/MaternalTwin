import VitalCard from "../components/VitalCard";
import RiskScore from "../components/RiskScore";
import HealthChart from "../components/HealthChart";
import AlertPanel from "../components/AlertPanel";

function Dashboard() {
  return (
    <div className="page">
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
            MS
          </div>

          <div>
            <strong>Maria Silva</strong>
            <span>28 Weeks + 3 Days</span>
          </div>

          <button>View Profile →</button>
        </div>
      </section>

      <section className="vitals-grid">
        <VitalCard
          title="Heart Rate"
          value="82"
          unit="bpm"
          icon="♥"
          status="Normal"
          trend="↓ 2.4%"
        />

        <VitalCard
          title="Blood Pressure"
          value="128/84"
          unit="mmHg"
          icon="↗"
          status="Monitor"
          trend="↑ 3.1%"
        />

        <VitalCard
          title="Oxygen Saturation"
          value="98"
          unit="%"
          icon="◉"
          status="Normal"
          trend="↑ 0.8%"
        />

        <VitalCard
          title="Temperature"
          value="36.8"
          unit="°C"
          icon="◌"
          status="Normal"
          trend="Stable"
        />
      </section>

      <section className="dashboard-grid">
        <HealthChart />

        <RiskScore score={28} />
      </section>

      <section className="health-overview-grid">
        <div className="overview-card">
          <div className="section-header">
            <div>
              <p>MATERNAL STATUS</p>
              <h2>Mother's Health</h2>
            </div>

            <span className="stable-badge">
              ● Stable
            </span>
          </div>

          <div className="health-metrics">
            <div className="metric-row">
              <div>
                <span>Heart Rate</span>
                <strong>82 bpm</strong>
              </div>

              <div className="metric-progress">
                <span style={{ width: "70%" }}></span>
              </div>
            </div>

            <div className="metric-row">
              <div>
                <span>Blood Pressure</span>
                <strong>128 / 84</strong>
              </div>

              <div className="metric-progress">
                <span style={{ width: "75%" }}></span>
              </div>
            </div>

            <div className="metric-row">
              <div>
                <span>Blood Glucose</span>
                <strong>104 mg/dL</strong>
              </div>

              <div className="metric-progress">
                <span style={{ width: "60%" }}></span>
              </div>
            </div>

            <div className="metric-row">
              <div>
                <span>Oxygen Saturation</span>
                <strong>98%</strong>
              </div>

              <div className="metric-progress">
                <span style={{ width: "95%" }}></span>
              </div>
            </div>
          </div>
        </div>

        <div className="overview-card">
          <div className="section-header">
            <div>
              <p>FETAL STATUS</p>
              <h2>Baby's Health</h2>
            </div>

            <span className="week-badge">
              28 Weeks
            </span>
          </div>

          <div className="baby-status">
            <div className="baby-item">
              <span>♥</span>

              <div>
                <p>Fetal Heart Rate</p>
                <strong>142 bpm</strong>
              </div>
            </div>

            <div className="baby-item">
              <span>↗</span>

              <div>
                <p>Growth Status</p>
                <strong>Normal</strong>
              </div>
            </div>

            <div className="baby-item">
              <span>◉</span>

              <div>
                <p>Movement</p>
                <strong>Active</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AlertPanel />
    </div>
  );
}

export default Dashboard;