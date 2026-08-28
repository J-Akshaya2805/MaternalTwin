import random
import time
import requests 


API_URL = "http://127.0.0.1:8000/predict"


def generate_health_data():

    data = {
        # -----------------------------
        # Mother
        # -----------------------------
        "age": 25,
        "systolic_bp": random.randint(110, 145),
        "diastolic_bp": random.randint(70, 95),
        "blood_sugar": round(random.uniform(4.5, 8.0), 1),
        "body_temp": round(random.uniform(97.5, 100.5), 1),
        "heart_rate": random.randint(65, 100),

        # -----------------------------
        # Baby
        # -----------------------------
        "fetal_heart_rate": random.randint(120, 160),
        "movement_count": random.randint(6, 20),
        "amniotic_fluid": round(random.uniform(8, 18), 1)
    }

    return data


def send_to_ml_api(data):

    try:

        response = requests.post(
            API_URL,
            json=data,
            timeout=5
        )

        response.raise_for_status()

        return response.json()

    except requests.exceptions.RequestException as error:

        print("\nERROR: Could not connect to ML API.")
        print(error)

        return None


if __name__ == "__main__":

    print("========================================")
    print("      MaternalTwin Live Simulator")
    print("========================================")

    print(f"ML API: {API_URL}")

    i = 1

    while True:

        # Generate simulated sensor data
        data = generate_health_data()

        # Send data to ML API
        result = send_to_ml_api(data)

        print("\n----------------------------------------")
        print(f"Reading {i}")
        print("----------------------------------------")

        print("\nMother")
        print(f"  Blood Pressure : {data['systolic_bp']}/{data['diastolic_bp']}")
        print(f"  Blood Sugar   : {data['blood_sugar']}")
        print(f"  Temperature   : {data['body_temp']}")
        print(f"  Heart Rate    : {data['heart_rate']}")

        print("\nBaby")
        print(f"  Fetal HR      : {data['fetal_heart_rate']}")
        print(f"  Movement      : {data['movement_count']}")
        print(f"  Fluid Level   : {data['amniotic_fluid']}")

        if result:

            print("\nAI RESULT")
            print(f"  Maternal Risk : {result['maternal_risk']}")
            print(f"  Baby Status   : {result['baby_status']}")
            print(f"  Overall       : {result['overall_status']}")

            if result["baby_alerts"]:

                print("\n  ALERTS:")

                for alert in result["baby_alerts"]:
                    print(f"   - {alert}")

            else:

                print("  Alerts        : None")

        time.sleep(3)

        i += 1