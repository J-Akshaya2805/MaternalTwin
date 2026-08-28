function VitalCard({
  title,
  value,
  unit,
  icon,
  status,
  trend,
}) {
  const statusClass =
    status === "Monitor"
      ? "monitor"
      : status === "High"
      ? "high"
      : "normal";

  return (
    <div className="vital-card">
      <div className="vital-top">
        <div className="vital-icon">
          {icon}
        </div>

        <span className={`vital-status ${statusClass}`}>
          {status}
        </span>
      </div>

      <p className="vital-title">{title}</p>

      <div className="vital-reading">
        <strong>{value}</strong>
        <span>{unit}</span>
      </div>

      <div className="vital-trend">
        <span>{trend}</span>
        <small>Latest reading</small>
      </div>
    </div>
  );
}

export default VitalCard;