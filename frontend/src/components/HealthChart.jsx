function HealthChart() {
  const points = `
    0,120
    70,105
    140,110
    210,85
    280,95
    350,60
    420,70
    500,40
  `;

  return (
    <section className="health-chart">
      <div className="section-header">
        <div>
          <p>HEALTH TREND</p>
          <h2>Maternal Health Trend</h2>
        </div>

        <select>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      <div className="chart-info">
        <span>
          <i></i>
          Health Stability
        </span>

        <strong>↑ 8% Improvement</strong>
      </div>

      <div className="chart-container">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="30"
            x2="500"
            y2="30"
            className="chart-grid"
          />

          <line
            x1="0"
            y1="75"
            x2="500"
            y2="75"
            className="chart-grid"
          />

          <line
            x1="0"
            y1="120"
            x2="500"
            y2="120"
            className="chart-grid"
          />

          <polyline
            points={points}
            fill="none"
            className="chart-line"
          />
        </svg>
      </div>

      <div className="chart-labels">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </section>
  );
}

export default HealthChart;