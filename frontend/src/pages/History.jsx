function History() {
  const records = [
    {
      date: "Today, 09:42 AM",
      title: "Health Monitoring Update",
      description:
        "Latest maternal vital signs synchronized successfully.",
      status: "Completed",
    },
    {
      date: "Yesterday, 06:20 PM",
      title: "AI Risk Assessment",
      description:
        "Personalized maternal risk score generated.",
      status: "Completed",
    },
    {
      date: "Aug 26, 10:15 AM",
      title: "Blood Pressure Alert",
      description:
        "Gradual increase detected across multiple readings.",
      status: "Reviewed",
    },
    {
      date: "Aug 25, 08:30 AM",
      title: "Digital Twin Update",
      description:
        "Personal baseline recalculated using recent data.",
      status: "Completed",
    },
  ];

  return (
    <div className="page">
      <section className="page-heading">
        <div>
          <p className="page-label">
            PATIENT HEALTH RECORDS
          </p>

          <h2>Health History</h2>

          <p>
            Timeline of monitoring events, predictions
            and digital twin updates.
          </p>
        </div>

        <button className="export-button">
          Export Report
        </button>
      </section>

      <section className="history-card">
        {records.map((record, index) => (
          <div className="history-item" key={index}>
            <div className="history-dot"></div>

            <div className="history-date">
              {record.date}
            </div>

            <div className="history-content">
              <h3>{record.title}</h3>

              <p>{record.description}</p>
            </div>

            <span className="history-status">
              {record.status}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}

export default History;