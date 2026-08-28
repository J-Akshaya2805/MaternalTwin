import React, { Suspense, useEffect, useState } from "react";

import { Canvas } from "@react-three/fiber";

import {
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";

import MotherModel from "../components/MotherModel.jsx";
import FetusModel from "../components/FetusModel.jsx";


function DigitalTwin() {

  // =====================================================
  // HEALTH DATA
  // =====================================================

  const [health, setHealth] = useState({
    motherHeartRate: 86,

    bloodPressure: {
      systolic: 130,
      diastolic: 80,
    },

    temperature: 98.3,

    babyHeartRate: 142,

    gestationalWeek: 24,

    maternalRisk: "Mid Risk",

    babyStatus: "Normal",

    babyMovement: 10,

    amnioticFluidIndex: 14,

    oxygen: 98,

    glucose: 92,

    fetalGrowth: 30,
  });


  const [lastUpdated, setLastUpdated] = useState(
    new Date().toLocaleTimeString()
  );


  // =====================================================
  // LIVE SIMULATION
  // =====================================================

  useEffect(() => {

    const interval = setInterval(() => {

      setHealth((prev) => ({

        ...prev,

        motherHeartRate:
          84 + Math.floor(Math.random() * 7),

        babyHeartRate:
          140 + Math.floor(Math.random() * 11),

        temperature:
          97.8 + Math.random() * 0.6,

        babyMovement:
          10 + Math.floor(Math.random() * 6),

      }));


      setLastUpdated(
        new Date().toLocaleTimeString()
      );

    }, 3000);


    return () => clearInterval(interval);

  }, []);


  return (

    <div className="page digital-twin-page">


      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <section className="page-heading">

        <div>

          <p className="page-label">
            LIVE VIRTUAL MODEL
          </p>

          <h2>
            Maternal Digital Twin
          </h2>

          <p>
            A virtual representation of the mother's
            current health state and fetal condition.
          </p>

        </div>


        <div className="live-indicator">

          <span></span>

          TWIN ACTIVE

        </div>

      </section>



      {/* =================================================
          3D DIGITAL TWIN
      ================================================= */}

      <section className="digital-twin-card">


        {/* ================================
            3D MODEL AREA
        ================================= */}

        <div className="canvas-area">

        <Canvas
  camera={{ position: [0, 0, 6], fov: 45 }}
  style={{
    background: "linear-gradient(135deg, #7596C2 0%, #A5BEE4 50%, #C4D5F0 100%)",
  }}
>


            <Suspense fallback={null}>

              {/* LIGHTS */}

              <ambientLight intensity={2} />

              <directionalLight
                position={[5, 8, 5]}
                intensity={3}
                castShadow
              />

              <directionalLight
                position={[-5, 5, 5]}
                intensity={1.5}
              />


              {/* MOTHER */}

              <MotherModel
                position={[-0.9, -1.0, 0]}
                scale={2.2}
                risk={health.maternalRisk}
              />


              {/* FETUS */}

              <FetusModel
                position={[0.9, -0.1
                  , 0]}
                scale={1.2}
                heartbeat={true}
              />


              {/* SHADOW */}

              <ContactShadows
                position={[0, -3, 0]}
                opacity={0.25}
                scale={15}
                blur={2}
                far={5}
              />


              {/* ENVIRONMENT */}

              <Environment preset="studio" />


              {/* CONTROLS */}

              <OrbitControls
                enableRotate={true}
                enableZoom={true}
                enablePan={true}
                enableDamping={true}
                rotateSpeed={0.8}
                zoomSpeed={0.8}
                panSpeed={0.8}
                minDistance={4}
                maxDistance={15}
              />

            </Suspense>

          </Canvas>

        </div>



        {/* ================================
            DIGITAL STATE
        ================================= */}

        <div className="twin-details">

          <p className="page-label">
            CURRENT DIGITAL STATE
          </p>

          <h2>
            Maternal Health Twin
          </h2>

          <p>
            The digital twin continuously represents
            maternal and fetal health using the latest
            health measurements. The values shown here
            are synchronized with the simulation state.
          </p>


          {/* ================================
              IMPORTANT STATS
          ================================= */}

          <div className="twin-stats">


            <div>

              <span>
                Gestational Week
              </span>

              <strong>
                {health.gestationalWeek} Weeks
              </strong>

            </div>


            <div>

              <span>
                Mother Heart Rate
              </span>

              <strong>
                {health.motherHeartRate} BPM
              </strong>

            </div>


            <div>

              <span>
                Fetal Heart Rate
              </span>

              <strong>
                {health.babyHeartRate} BPM
              </strong>

            </div>


            <div>

              <span>
                Last Update
              </span>

              <strong>
                {lastUpdated}
              </strong>

            </div>


          </div>

        </div>

      </section>



      {/* =================================================
          HEALTH DETAILS
      ================================================= */}

      <section className="health-panel">


        {/* ================================================
            MOTHER HEALTH
        ================================================= */}

        <div className="health-card">

          <div className="health-card-header">

            <div className="health-icon">
              🤰
            </div>

            <div>

              <p className="health-label">
                MATERNAL MONITORING
              </p>

              <h2>
                Mother Health
              </h2>

            </div>

          </div>


          <div className="health-data">


            <div className="health-row">

              <span>
                Heart Rate
              </span>

              <strong>
                {health.motherHeartRate} BPM
              </strong>

            </div>


            <div className="health-row">

              <span>
                Blood Pressure
              </span>

              <strong>
                {health.bloodPressure.systolic}/
                {health.bloodPressure.diastolic} mmHg
              </strong>

            </div>


            <div className="health-row">

              <span>
                SpO₂
              </span>

              <strong>
                {health.oxygen}%
              </strong>

            </div>


            <div className="health-row">

              <span>
                Temperature
              </span>

              <strong>
                {health.temperature.toFixed(1)} °F
              </strong>

            </div>


            <div className="health-row">

              <span>
                Glucose
              </span>

              <strong>
                {health.glucose} mg/dL
              </strong>

            </div>


          </div>


          <RiskBadge
            risk={health.maternalRisk}
          />

        </div>



        {/* ================================================
            FETAL HEALTH
        ================================================= */}

        <div className="health-card">

          <div className="health-card-header">

            <div className="health-icon">
              👶
            </div>

            <div>

              <p className="health-label">
                FETAL MONITORING
              </p>

              <h2>
                Fetal Health
              </h2>

            </div>

          </div>


          <div className="health-data">


            <div className="health-row">

              <span>
                Heart Rate
              </span>

              <strong>
                {health.babyHeartRate} BPM
              </strong>

            </div>


            <div className="health-row">

              <span>
                Movement
              </span>

              <strong>
                {health.babyMovement}
              </strong>

            </div>


            <div className="health-row">

              <span>
                Growth
              </span>

              <strong>
                {health.fetalGrowth} cm
              </strong>

            </div>


            <div className="health-row">

              <span>
                Amniotic Fluid
              </span>

              <strong>
                {health.amnioticFluidIndex} cm
              </strong>

            </div>


          </div>


          <RiskBadge
            risk={
              health.babyStatus === "Normal"
                ? "NORMAL"
                : "WARNING"
            }
          />

        </div>



        {/* ================================================
            LAST UPDATE
        ================================================= */}

        <div className="health-update-card">

          <div className="update-icon">
            🔄
          </div>

          <div>

            <p>
              LIVE SIMULATION
            </p>

            <strong>
              Data updates every 3 seconds
            </strong>

            <span>
              Last update: {lastUpdated}
            </span>

          </div>

        </div>


      </section>

    </div>

  );
}



/* =========================================================
   RISK BADGE
========================================================= */

function RiskBadge({ risk }) {

  let className = "normal";


  if (
    risk === "WARNING" ||
    risk === "Mid Risk"
  ) {

    className = "warning";

  }


  if (risk === "HIGH RISK") {

    className = "high";

  }


  return (

    <div className={`risk-badge ${className}`}>

      {risk === "NORMAL" && "✓"}

      {risk === "WARNING" && "⚠"}

      {risk === "Mid Risk" && "⚠"}

      {risk === "HIGH RISK" && "🚨"}

      <span>
        {risk}
      </span>

    </div>

  );

}


export default DigitalTwin;