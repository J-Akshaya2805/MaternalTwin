import { useState } from "react";

import VitalCard from "../components/VitalCard";
import HealthChart from "../components/HealthChart";
import AlertPanel from "../components/AlertPanel";

import { getPrediction } from "../services/api";

function Monitoring() {
  const [formData, setFormData] = useState({
    patientId: "MT001",

    motherAge: 27,

    gestationalWeek: 28,

    motherHeartRate: 86,

    systolic: 130,

    diastolic: 80,

    temperature: 98,

    bloodGlucose: 6,

    hemoglobin: 12.1,

    babyHeartRate: 145,

    babyMovement: 12,

    amnioticFluidIndex: 12,
  });

  const [message, setMessage] = useState("");

  const [risk, setRisk] = useState("");

  const [babyStatus, setBabyStatus] = useState("");

  const [loading, setLoading] = useState(false);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,

      [name]:
        name === "patientId"
          ? value
          : Number(value),
    }));
  };

  // ==========================================
  // SUBMIT HEALTH DATA
  // ==========================================

  const submitHealthData = async () => {
    try {
      setLoading(true);

      setMessage("");

      setRisk("");

      setBabyStatus("");

      // ----------------------------------------
      // Prepare health data
      // ----------------------------------------

      const healthData = {
        patientId: formData.patientId,

        motherAge: formData.motherAge,

        gestationalWeek:
          formData.gestationalWeek,

        motherHeartRate:
          formData.motherHeartRate,

        bloodPressure: {
          systolic: formData.systolic,

          diastolic: formData.diastolic,
        },

        temperature:
          formData.temperature,

        bloodGlucose:
          formData.bloodGlucose,

        hemoglobin:
          formData.hemoglobin,

        babyHeartRate:
          formData.babyHeartRate,

        babyMovement:
          formData.babyMovement,

        amnioticFluidIndex:
          formData.amnioticFluidIndex,
      };

      console.log(
        "Sending health data:",
        healthData
      );

      // ----------------------------------------
      // Send to backend
      // ----------------------------------------

      const result =
        await getPrediction(healthData);

      console.log(
        "Prediction result:",
        result
      );

      // ----------------------------------------
      // Get ML prediction
      // ----------------------------------------

      const prediction =
        result.prediction;

      const maternalRisk =
        prediction?.maternal_risk ||
        "Unknown";

      const status =
        prediction?.baby_status ||
        "Unknown";

      // ----------------------------------------
      // Update UI
      // ----------------------------------------

      setRisk(maternalRisk);

      setBabyStatus(status);

      setMessage(
        "Health data submitted successfully."
      );

    } catch (error) {
      console.error(
        "Prediction error:",
        error
      );

      setMessage(
        `Error: ${error.message}`
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="page">

      {/* =====================================
          HEADER
      ===================================== */}

      <section className="page-heading">

        <div>

          <p className="page-label">
            REAL-TIME HEALTH MONITORING
          </p>

          <h2>
            Health Monitoring
          </h2>

          <p>
            Enter the latest maternal and
            fetal health measurements.
          </p>

        </div>

        <div className="sync-status">

          <span className="online-dot"></span>

          Backend Connected

        </div>

      </section>


      {/* =====================================
          INPUT CARD
      ===================================== */}

      <section className="simulation-card">

        <h3>
          Enter Health Data
        </h3>

        <p>
          Enter the patient's latest health
          measurements and send them to the
          AI prediction system.
        </p>


        {/* ===================================
            MATERNAL HEALTH
        =================================== */}

        <h3>
          Maternal Health
        </h3>

        <div className="input-grid">

          {/* Heart Rate */}

          <div>

            <label>
              Heart Rate (bpm)
            </label>

            <input
              type="number"
              name="motherHeartRate"
              value={
                formData.motherHeartRate
              }
              onChange={handleChange}
            />

          </div>


          {/* Systolic */}

          <div>

            <label>
              Systolic BP
            </label>

            <input
              type="number"
              name="systolic"
              value={
                formData.systolic
              }
              onChange={handleChange}
            />

          </div>


          {/* Diastolic */}

          <div>

            <label>
              Diastolic BP
            </label>

            <input
              type="number"
              name="diastolic"
              value={
                formData.diastolic
              }
              onChange={handleChange}
            />

          </div>


          {/* Temperature */}

          <div>

            <label>
              Temperature (°F)
            </label>

            <input
              type="number"
              step="0.1"
              name="temperature"
              value={
                formData.temperature
              }
              onChange={handleChange}
            />

          </div>


          {/* Blood Glucose */}

          <div>

            <label>
              Blood Glucose
            </label>

            <input
              type="number"
              step="0.1"
              name="bloodGlucose"
              value={
                formData.bloodGlucose
              }
              onChange={handleChange}
            />

          </div>


          {/* Hemoglobin */}

          <div>

            <label>
              Hemoglobin
            </label>

            <input
              type="number"
              step="0.1"
              name="hemoglobin"
              value={
                formData.hemoglobin
              }
              onChange={handleChange}
            />

          </div>

        </div>


        {/* ===================================
            FETAL HEALTH
        =================================== */}

        <h3>
          Fetal Health
        </h3>

        <div className="input-grid">

          {/* Fetal Heart Rate */}

          <div>

            <label>
              Fetal Heart Rate
            </label>

            <input
              type="number"
              name="babyHeartRate"
              value={
                formData.babyHeartRate
              }
              onChange={handleChange}
            />

          </div>


          {/* Movement */}

          <div>

            <label>
              Baby Movement
            </label>

            <input
              type="number"
              name="babyMovement"
              value={
                formData.babyMovement
              }
              onChange={handleChange}
            />

          </div>


          {/* Amniotic Fluid */}

          <div>

            <label>
              Amniotic Fluid Index
            </label>

            <input
              type="number"
              step="0.1"
              name="amnioticFluidIndex"
              value={
                formData.amnioticFluidIndex
              }
              onChange={handleChange}
            />

          </div>

        </div>


        {/* ===================================
            SUBMIT
        =================================== */}

        <button
          onClick={submitHealthData}
          disabled={loading}
        >

          {loading
            ? "Processing..."
            : "Submit Health Data"}

        </button>


        {/* ===================================
            SYSTEM RESPONSE
        =================================== */}

        {message && (

          <div className="simulation-info">

            <strong>
              System Response
            </strong>

            <p>
              {message}
            </p>

          </div>

        )}


        {/* ===================================
            MATERNAL RISK
        =================================== */}

        {risk && (

          <div className="simulation-info">

            <strong>
              AI Maternal Risk
            </strong>

            <p>
              {risk}
            </p>

          </div>

        )}


        {/* ===================================
            BABY STATUS
        =================================== */}

        {babyStatus && (

          <div className="simulation-info">

            <strong>
              Baby Status
            </strong>

            <p>
              {babyStatus}
            </p>

          </div>

        )}

      </section>


      {/* =====================================
          CURRENT VITALS
      ===================================== */}

      <section className="vitals-grid">

        <VitalCard
          title="Heart Rate"
          value={
            formData.motherHeartRate
          }
          unit="bpm"
          icon="♥"
          status="Live"
          trend="Current"
        />

        <VitalCard
          title="Blood Pressure"
          value={`${formData.systolic}/${formData.diastolic}`}
          unit="mmHg"
          icon="↗"
          status="Live"
          trend="Current"
        />

        <VitalCard
          title="Blood Glucose"
          value={
            formData.bloodGlucose
          }
          unit="mg/dL"
          icon="◇"
          status="Live"
          trend="Current"
        />

        <VitalCard
          title="Fetal Heart Rate"
          value={
            formData.babyHeartRate
          }
          unit="bpm"
          icon="♥"
          status="Live"
          trend="Current"
        />

      </section>


      {/* =====================================
          CHART
      ===================================== */}

      <HealthChart />


      {/* =====================================
          ALERTS
      ===================================== */}

      <AlertPanel />

    </div>
  );
}

export default Monitoring;