function Header() {
  return (
    <header className="header">
      <div>
        <p className="header-label">
          MATERNAL DIGITAL TWIN PLATFORM
        </p>

        <h1>Maternal Healthcare Dashboard</h1>
      </div>

      <div className="header-right">
        <div className="live-indicator">
          <span></span>
          LIVE
        </div>

        <button className="notification-button">
          🔔
          <b>2</b>
        </button>

        <div className="user-profile">
          <div className="profile-avatar">
            DR
          </div>

          <div>
            <strong>Dr. Sarah</strong>
            <small>Healthcare Provider</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;