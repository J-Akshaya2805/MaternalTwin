function Navbar() {
  return (
    <header className="navbar">
      <div>
        <p className="breadcrumb">Maternal Healthcare / Digital Twin</p>
        <h1>Maternal Health Dashboard</h1>
      </div>

      <div className="navbar-actions">
        <div className="live-status">
          <span></span>
          LIVE MONITORING
        </div>

        <button className="notification-btn">
          🔔
          <span className="notification-count">3</span>
        </button>

        <div className="doctor-profile">
          <div className="avatar">DR</div>

          <div>
            <strong>Dr. Sarah</strong>
            <small>Healthcare Provider</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;