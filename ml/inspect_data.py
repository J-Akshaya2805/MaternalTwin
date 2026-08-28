import pandas as pd

# Load dataset
df = pd.read_csv("data/maternal_health.csv")

print("\n===== FIRST 5 ROWS =====")
print(df.head())

print("\n===== DATASET SHAPE =====")
print(df.shape)

print("\n===== COLUMN NAMES =====")
print(df.columns.tolist())

print("\n===== DATA TYPES =====")
print(df.dtypes)

print("\n===== MISSING VALUES =====")
print(df.isnull().sum())

print("\n===== RISK LEVEL COUNTS =====")
print(df["RiskLevel"].value_counts())