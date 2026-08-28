import pandas as pd
import joblib

# ============================================
# Load trained model
# ============================================

model = joblib.load("models/maternal_risk_model.pkl")
label_encoder = joblib.load("models/risk_label_encoder.pkl")


# ============================================
# Prediction function
# ============================================

def predict_maternal_risk(
    age,
    systolic_bp,
    diastolic_bp,
    blood_sugar,
    body_temp,
    heart_rate
):

    input_data = pd.DataFrame([{
        "Age": age,
        "SystolicBP": systolic_bp,
        "DiastolicBP": diastolic_bp,
        "BS": blood_sugar,
        "BodyTemp": body_temp,
        "HeartRate": heart_rate
    }])

    prediction = model.predict(input_data)

    risk_level = label_encoder.inverse_transform(prediction)[0]

    return risk_level


# ============================================
# Test prediction
# ============================================

if __name__ == "__main__":

    result = predict_maternal_risk(
        age=25,
        systolic_bp=130,
        diastolic_bp=80,
        blood_sugar=6.0,
        body_temp=98.0,
        heart_rate=86
    )

    print("Predicted Maternal Risk:", result)