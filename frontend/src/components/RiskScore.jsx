function RiskScore({ score = 28 }) {
  let riskLevel = "Low Risk";

  if (score >= 60) {
    riskLevel = "High Risk";
  } else if (score >= 30) {
    riskLevel = "Moderate Risk";
  }

  return (
    <section className="risk-score-card">
      <div className="section-header">
        <div>
          <p>AI RISK ANALYSIS</p>
          <h2>Maternal Risk Score</h2>
        </div>

        <span className="ai-badge">
          AI Powered
        </span>
      </div>

      <div className="risk-content">
        <div
          className="risk-circle"
          style={{
            background: `conic-gradient(
              #2563eb ${score * 3.6}deg,
              #e9edf5 0deg
            )`,
          }}
        >
          <div className="risk-inner">
            <strong>{score}%</strong>
            <span>{riskLevel}</span>
          </div>
        </div>

        <div className="risk-info">
          <h3>{riskLevel}</h3>

          <p>
            The risk assessment is generated using
            maternal health indicators, historical
            trends and personalized baseline data.
          </p>

          <div className="risk-features">
            <span>✓ Personalized baseline</span>
            <span>✓ Trend analysis</span>
            <span>✓ AI prediction model</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RiskScore;