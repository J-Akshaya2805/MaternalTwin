import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: "▦",
    },
    {
      name: "Monitoring",
      path: "/monitoring",
      icon: "♡",
    },
    {
      name: "Digital Twin",
      path: "/digital-twin",
      icon: "◎",
    },
    {
      name: "Prediction",
      path: "/prediction",
      icon: "↗",
    },
    {
      name: "History",
      path: "/history",
      icon: "◷",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="logo-section">
        <div className="logo-icon">M</div>

        <div className="logo-text">
          <h2>MaternalTwin</h2>
          <p>Digital Healthcare</p>
        </div>
      </div>

      <p className="menu-title">MAIN MENU</p>

      <nav className="navigation">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="system-card">
          <span className="online-dot"></span>

          <div>
            <strong>System Online</strong>
            <small>All services active</small>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;