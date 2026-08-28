from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

from baby_monitor import monitor_baby


# ============================================
# Load trained ML model
# ============================================

model = joblib.load("models/maternal_risk_model.pkl")
label_encoder = joblib.load("models/risk_label_encoder.pkl")


# ============================================
# Create FastAPI application
# ============================================

app = FastAPI(
    title="MaternalTwin ML API",
    description="AI-powered maternal and baby health monitoring API",
    version="1.0.0"
)


# ============================================
# Input data structure
# ============================================

class HealthData(BaseModel):

    # Mother
    age: float
    systolic_bp: float
    diastolic_bp: float
    blood_sugar: float
    body_temp: float
    heart_rate: float

    # Baby
    fetal_heart_rate: float
    movement_count: int
    amniotic_fluid: float


# ============================================
# Health prediction endpoint
# ============================================

@app.post("/predict")
def predict_health(data: HealthData):

    # ----------------------------------------
    # Maternal prediction
    # ----------------------------------------

    maternal_data = pd.DataFrame([{
        "Age": data.age,
        "SystolicBP": data.systolic_bp,
        "DiastolicBP": data.diastolic_bp,
        "BS": data.blood_sugar,
        "BodyTemp": data.body_temp,
        "HeartRate": data.heart_rate
    }])

    maternal_prediction = model.predict(maternal_data)

    maternal_risk = label_encoder.inverse_transform(
        maternal_prediction
    )[0]

    # ----------------------------------------
    # Baby monitoring
    # ----------------------------------------

    baby_result = monitor_baby(
        fetal_heart_rate=data.fetal_heart_rate,
        movement_count=data.movement_count,
        amniotic_fluid=data.amniotic_fluid
    )

    # ----------------------------------------
    # Overall twin status
    # ----------------------------------------

    if baby_result["status"] == "Critical":
        overall_status = "Critical"

    elif baby_result["status"] == "Attention":
        overall_status = "Attention"

    elif maternal_risk == "high risk":
        overall_status = "Attention"

    else:
        overall_status = "Normal"

    # ----------------------------------------
    # Return combined result
    # ----------------------------------------

    return {
        "maternal_risk": maternal_risk,

        "baby_status": baby_result["status"],

        "baby_alerts": baby_result["alerts"],

        "overall_status": overall_status,

        "measurements": {
            "maternal": {
                "age": data.age,
                "systolic_bp": data.systolic_bp,
                "diastolic_bp": data.diastolic_bp,
                "blood_sugar": data.blood_sugar,
                "body_temp": data.body_temp,
                "heart_rate": data.heart_rate
            },

            "baby": {
                "fetal_heart_rate": data.fetal_heart_rate,
                "movement_count": data.movement_count,
                "amniotic_fluid": data.amniotic_fluid
            }
        }
    }

