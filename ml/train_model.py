import joblib
import os
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.pipeline import Pipeline

from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

# ============================================
# 1. Load dataset
# ============================================

df = pd.read_csv("data/maternal_health.csv")

print("Dataset loaded successfully!")
print("Dataset shape:", df.shape)

# ============================================
# 2. Features and target
# ============================================

features = [
    "Age",
    "SystolicBP",
    "DiastolicBP",
    "BS",
    "BodyTemp",
    "HeartRate"
]

X = df[features]
y = df["RiskLevel"]

# ============================================
# 3. Encode target
# ============================================

label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

print("\nRisk classes:")
for number, label in enumerate(label_encoder.classes_):
    print(f"{number} = {label}")

# ============================================
# 4. Train-test split
# ============================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_encoded,
    test_size=0.20,
    random_state=42,
    stratify=y_encoded
)

print("\nTraining samples:", len(X_train))
print("Testing samples:", len(X_test))

# ============================================
# 5. Define models
# ============================================

models = {

    "Logistic Regression": Pipeline([
        ("scaler", StandardScaler()),
        ("model", LogisticRegression(max_iter=1000))
    ]),

    "Random Forest": RandomForestClassifier(
        n_estimators=200,
        random_state=42
    ),

    "SVM": Pipeline([
        ("scaler", StandardScaler()),
        ("model", SVC())
    ])
}

# ============================================
# 6. Train and evaluate
# ============================================

results = {}

for name, model in models.items():

    print("\n" + "=" * 50)
    print(name)
    print("=" * 50)

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    accuracy = accuracy_score(y_test, predictions)

    results[name] = accuracy

    print(f"\nAccuracy: {accuracy:.4f}")

    print("\nClassification Report:")
    print(
        classification_report(
            y_test,
            predictions,
            target_names=label_encoder.classes_
        )
    )

    print("Confusion Matrix:")
    print(confusion_matrix(y_test, predictions))


# ============================================
# 7. Compare models
# ============================================

print("\n\n" + "=" * 50)
print("MODEL COMPARISON")
print("=" * 50)

for name, accuracy in results.items():
    print(f"{name}: {accuracy:.4f}")

best_model_name = max(results, key=results.get)

print("\nBest model:", best_model_name)
print(f"Best accuracy: {results[best_model_name]:.4f}")

# ============================================
# 8. Train final model
# ============================================

best_model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)

best_model.fit(X_train, y_train)

# ============================================
# 9. Create models directory
# ============================================

os.makedirs("models", exist_ok=True)

# ============================================
# 10. Save model and label encoder
# ============================================

joblib.dump(
    best_model,
    "models/maternal_risk_model.pkl"
)

joblib.dump(
    label_encoder,
    "models/risk_label_encoder.pkl"
)

print("\nFinal Random Forest model saved successfully!")
print("Model: models/maternal_risk_model.pkl")
print("Label encoder: models/risk_label_encoder.pkl")