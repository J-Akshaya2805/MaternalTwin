function AlertPanel() {
  const alerts = [
    {
      type: "warning",
      icon: "!",
      title: "Blood pressure trend detected",
      description:
        "Gradual increase detected in the last four readings.",
      time: "12 min ago",
    },
    {
      type: "info",
      icon: "i",
      title: "Health data synchronized",
      description:
        "Latest monitoring data has been successfully updated.",
      time: "32 min ago",
    },
    {
      type: "success",
      icon: "✓",
      title: "Fetal indicators stable",
      description:
        "Current fetal health indicators are within normal range.",
      time: "1 hour ago",
    },
  ];

  return (
    <section className="alert-panel">
      <div className="section-header">
        <div>
          <p>EARLY WARNING SYSTEM</p>
          <h2>Recent Alerts</h2>
        </div>

        <button className="view-all">
          View All
        </button>
      </div>

      <div className="alert-list">
        {alerts.map((alert) => (
          <div
            className={`alert-item ${alert.type}`}
            key={alert.title}
          >
            <div className="alert-icon">
              {alert.icon}
            </div>

            <div className="alert-text">
              <h4>{alert.title}</h4>
              <p>{alert.description}</p>
            </div>

            <small>{alert.time}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AlertPanel;