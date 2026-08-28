import VitalCard from "../components/VitalCard";
import HealthChart from "../components/HealthChart";
import AlertPanel from "../components/AlertPanel";

function Monitoring() {
  return (
    <div className="page">
      <section className="page-heading">
        <div>
          <p className="page-label">
            REAL-TIME HEALTH MONITORING
          </p>

          <h2>Health Monitoring</h2>

          <p>
            Monitor live maternal and fetal health
            indicators.
          </p>
        </div>

        <div className="sync-status">
          <span className="online-dot"></span>
          Updated just now
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
          title="Blood Glucose"
          value="104"
          unit="mg/dL"
          icon="◇"
          status="Normal"
          trend="Stable"
        />

        <VitalCard
          title="SpO₂"
          value="98"
          unit="%"
          icon="◉"
          status="Normal"
          trend="↑ 0.8%"
        />
      </section>

      <HealthChart />

      <AlertPanel />
    </div>
  );
}

export default Monitoring;