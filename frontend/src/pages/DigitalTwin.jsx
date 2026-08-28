function DigitalTwin() {
  return (
    <div className="page">
      <section className="page-heading">
        <div>
          <p className="page-label">
            LIVE VIRTUAL MODEL
          </p>

          <h2>Maternal Digital Twin</h2>

          <p>
            A continuously synchronized virtual
            representation of maternal and fetal health.
          </p>
        </div>

        <div className="live-indicator">
          <span></span>
          TWIN ACTIVE
        </div>
      </section>

      <section className="digital-twin-card">
        <div className="twin-visualization">
          <div className="outer-ring"></div>

          <div className="middle-ring"></div>

          <div className="twin-center">
            <span>◉</span>
            <strong>LIVE</strong>
          </div>

          <div className="twin-node node-heart">
            <span>♥</span>
            <small>Heart</small>
          </div>

          <div className="twin-node node-bp">
            <span>↗</span>
            <small>BP</small>
          </div>

          <div className="twin-node node-fetus">
            <span>◉</span>
            <small>Fetus</small>
          </div>

          <div className="twin-node node-fluid">
            <span>≈</span>
            <small>Fluid</small>
          </div>
        </div>

        <div className="twin-details">
          <p className="page-label">
            CURRENT DIGITAL STATE
          </p>

          <h2>Personalized Maternal Twin</h2>

          <p>
            The digital twin combines current vital
            signs, historical health patterns and
            predictive AI models to maintain a
            personalized representation of the
            pregnancy.
          </p>

          <div className="twin-stats">
            <div>
              <span>Synchronization</span>
              <strong>99.2%</strong>
            </div>

            <div>
              <span>Data Points</span>
              <strong>12,480</strong>
            </div>

            <div>
              <span>AI Confidence</span>
              <strong>94%</strong>
            </div>

            <div>
              <span>Last Update</span>
              <strong>Just Now</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="twin-summary-grid">
        <div className="summary-box">
          <span>Maternal State</span>
          <strong>Stable</strong>
          <p>
            Current maternal indicators are within
            expected personalized ranges.
          </p>
        </div>

        <div className="summary-box">
          <span>Fetal State</span>
          <strong>Healthy</strong>
          <p>
            Fetal health indicators are stable and
            within the expected range.
          </p>
        </div>

        <div className="summary-box">
          <span>Risk Trajectory</span>
          <strong>Low</strong>
          <p>
            Predicted short-term trajectory remains
            stable based on current data.
          </p>
        </div>
      </section>
    </div>
  );
}

export default DigitalTwin;