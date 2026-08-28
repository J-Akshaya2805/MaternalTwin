def monitor_baby(
    fetal_heart_rate,
    movement_count,
    amniotic_fluid
):
    """
    Simple prototype monitoring logic for the hackathon.

    This is NOT a clinical diagnostic system.
    """

    alerts = []

    # ----------------------------------------
    # Fetal heart rate
    # ----------------------------------------

    if fetal_heart_rate < 110:
        alerts.append("Fetal heart rate is below the prototype safe range.")

    elif fetal_heart_rate > 160:
        alerts.append("Fetal heart rate is above the prototype safe range.")

    # ----------------------------------------
    # Baby movement
    # ----------------------------------------

    if movement_count < 5:
        alerts.append("Low fetal movement detected.")

    # ----------------------------------------
    # Amniotic fluid
    # ----------------------------------------

    if amniotic_fluid < 5:
        alerts.append("Low amniotic fluid level detected.")

    elif amniotic_fluid > 25:
        alerts.append("High amniotic fluid level detected.")

    # ----------------------------------------
    # Overall status
    # ----------------------------------------

    if len(alerts) == 0:
        status = "Normal"

    elif len(alerts) == 1:
        status = "Attention"

    else:
        status = "Critical"

    return {
        "status": status,
        "alerts": alerts
    }


# ============================================
# Test
# ============================================

if __name__ == "__main__":

    result = monitor_baby(
        fetal_heart_rate=95,
        movement_count=2,
        amniotic_fluid=2
    )

    print("Baby Monitoring Result:")
    print(result)