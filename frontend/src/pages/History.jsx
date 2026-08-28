import { useEffect, useState } from "react";

import { getHealthHistory } from "../services/api";

function History() {

  const [records, setRecords] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ========================================
  // LOAD HISTORY
  // ========================================

  const loadHistory = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getHealthHistory();

      console.log("Health History:", data);

      setRecords(data.records || []);

    } catch (err) {

      console.error("History Error:", err);

      setError(err.message);

    } finally {

      setLoading(false);

    }
  };


  // ========================================
  // LOAD WHEN PAGE OPENS
  // ========================================

  useEffect(() => {

    loadHistory();

  }, []);


  // ========================================
  // FORMAT DATE
  // ========================================

  const formatDate = (date) => {

    if (!date) {
      return "Unknown date";
    }

    const newDate = new Date(date);

    return newDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  };


  // ========================================
  // RISK CLASS
  // ========================================

  const getRiskClass = (risk) => {

    if (!risk) {
      return "";
    }

    const value = risk.toLowerCase();

    if (value.includes("high")) {
      return "high";
    }

    if (value.includes("mid")) {
      return "monitor";
    }

    return "";

  };


  // ========================================
  // STATUS TEXT
  // ========================================

  const getStatus = (risk) => {

    if (!risk) {
      return "Completed";
    }

    const value = risk.toLowerCase();

    if (value.includes("high")) {
      return "Attention";
    }

    if (value.includes("mid")) {
      return "Monitor";
    }

    return "Normal";

  };


  // ========================================
  // RECORD TITLE
  // ========================================

  const getTitle = (record) => {

    if (record.maternalRisk) {
      return "AI Risk Assessment";
    }

    return "Health Monitoring Update";

  };


  // ========================================
  // RECORD DESCRIPTION
  // ========================================

  const getDescription = (record) => {

    return (
      `Heart Rate: ${record.motherHeartRate ?? "--"} bpm` +
      ` • Blood Pressure: ${record.bloodPressure?.systolic ?? "--"}/${record.bloodPressure?.diastolic ?? "--"} mmHg` +
      ` • Fetal HR: ${record.babyHeartRate ?? "--"} bpm`
    );

  };


  return (

    <div className="page">


      {/* ========================================
          PAGE HEADER
      ======================================== */}

      <section className="page-heading">

        <div>

          <p className="page-label">
            PATIENT HEALTH RECORDS
          </p>

          <h2>
            Health History
          </h2>

          <p>
            Timeline of monitoring events,
            predictions and health updates.
          </p>

        </div>


        <button
          className="export-button"
          onClick={loadHistory}
        >
          ↻ Refresh
        </button>

      </section>



      {/* ========================================
          LOADING
      ======================================== */}

      {loading && (

        <section className="history-card">

          <div className="history-empty">

            <div className="history-empty-icon">
              ⟳
            </div>

            <h3>
              Loading health history...
            </h3>

            <p>
              Fetching the latest patient records.
            </p>

          </div>

        </section>

      )}



      {/* ========================================
          ERROR
      ======================================== */}

      {!loading && error && (

        <section className="history-card">

          <div className="history-empty">

            <div className="history-empty-icon">
              !
            </div>

            <h3>
              Unable to load health history
            </h3>

            <p>
              {error}
            </p>

            <button
              className="export-button"
              onClick={loadHistory}
            >
              Try Again
            </button>

          </div>

        </section>

      )}



      {/* ========================================
          HISTORY RECORDS
      ======================================== */}

      {!loading &&
        !error &&
        records.length > 0 && (

          <section className="history-card">

            {records.map((record, index) => {

              const risk = record.maternalRisk || "";

              const riskClass =
                getRiskClass(risk);

              const status =
                getStatus(risk);


              return (

                <div
                  className="history-item"
                  key={record._id || index}
                >


                  {/* TIMELINE DOT */}

                  <div className="history-dot">
                  </div>


                  {/* DATE */}

                  <div className="history-date">

                    {formatDate(
                      record.createdAt
                    )}

                  </div>


                  {/* RECORD INFORMATION */}

                  <div className="history-content">

                    <h3>
                      {getTitle(record)}
                    </h3>


                    <p>
                      {getDescription(record)}
                    </p>


                    <p className="history-extra">

                      Maternal Risk:{" "}

                      <strong>
                        {record.maternalRisk ||
                          "Not available"}
                      </strong>

                      {" • "}

                      Baby Status:{" "}

                      <strong>
                        {record.babyStatus ||
                          "Not available"}
                      </strong>

                    </p>


                    <p className="history-extra">

                      Temperature:{" "}

                      <strong>
                        {record.temperature ?? "--"} °F
                      </strong>

                      {" • "}

                      Blood Glucose:{" "}

                      <strong>
                        {record.bloodGlucose ?? "--"}
                      </strong>

                      {" • "}

                      Movement:{" "}

                      <strong>
                        {record.babyMovement ?? "--"}
                      </strong>

                    </p>

                  </div>


                  {/* STATUS */}

                  <span
                    className={`history-status ${riskClass}`}
                  >
                    {status}
                  </span>


                </div>

              );

            })}

          </section>

        )}



      {/* ========================================
          NO RECORDS
      ======================================== */}

      {!loading &&
        !error &&
        records.length === 0 && (

          <section className="history-card">

            <div className="history-empty">

              <div className="history-empty-icon">
                ♥
              </div>

              <h3>
                No health records yet
              </h3>

              <p>
                Submit health data from the
                Monitoring page to create
                your health history.
              </p>

            </div>

          </section>

        )}

    </div>

  );

}


export default History;