import requests
import time


API_URL = "http://127.0.0.1:8000/predict"


SCENARIOS = {

    "NORMAL": {
        "age": 25,
        "systolic_bp": 120,
        "diastolic_bp": 80,
        "blood_sugar": 5.2,
        "body_temp": 98.2,
        "heart_rate": 75,
        "fetal_heart_rate": 145,
        "movement_count": 12,
        "amniotic_fluid": 12
    },

    "ATTENTION": {
        "age": 25,
        "systolic_bp": 140,
        "diastolic_bp": 90,
        "blood_sugar": 7.2,
        "body_temp": 99.5,
        "heart_rate": 95,
        "fetal_heart_rate": 125,
        "movement_count": 6,
        "amniotic_fluid": 8
    },

    "CRITICAL": {
        "age": 25,
        "systolic_bp": 145,
        "diastolic_bp": 95,
        "blood_sugar": 8.0,
        "body_temp": 100.2,
        "heart_rate": 100,
        "fetal_heart_rate": 95,
        "movement_count": 2,
        "amniotic_fluid": 3
    }
}


def send_scenario(name, data):

    print("\n========================================")
    print(f"        {name} SCENARIO")
    print("========================================")

    print("\nSending health data...")

    try:

        response = requests.post(
            API_URL,
            json=data,
            timeout=5
        )

        response.raise_for_status()

        result = response.json()

        print("\n--- INPUT ---")

        print(
            f"Mother BP       : "
            f"{data['systolic_bp']}/{data['diastolic_bp']}"
        )

        print(f"Mother HR       : {data['heart_rate']}")
        print(f"Blood Sugar     : {data['blood_sugar']}")

        print(f"Baby FHR        : {data['fetal_heart_rate']}")
        print(f"Baby Movement   : {data['movement_count']}")
        print(f"Amniotic Fluid  : {data['amniotic_fluid']}")

        print("\n--- AI RESULT ---")

        print(f"Maternal Risk   : {result['maternal_risk']}")
        print(f"Baby Status     : {result['baby_status']}")
        print(f"Overall Status  : {result['overall_status']}")

        if result["baby_alerts"]:

            print("\nAlerts:")

            for alert in result["baby_alerts"]:
                print(f"  - {alert}")

        else:

            print("\nAlerts          : None")

    except requests.exceptions.RequestException as error:

        print("\nERROR: Could not connect to ML API.")
        print(error)


if __name__ == "__main__":

    print("========================================")
    print("       MaternalTwin Demo")
    print("========================================")

    print("\nMake sure FastAPI is running:")
    print("uvicorn app:app --reload --port 8000")

    for name, data in SCENARIOS.items():

        send_scenario(name, data)

        print("\nWaiting 5 seconds...")
        time.sleep(5)

    print("\n========================================")
    print("          DEMO COMPLETE")
    print("========================================")