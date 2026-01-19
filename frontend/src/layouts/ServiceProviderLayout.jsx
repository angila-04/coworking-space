import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

const linkStyle = {
  display: "block",
  padding: "10px 12px",
  marginBottom: "8px",
  color: "#cbd5e1",
  textDecoration: "none",
  borderRadius: "6px",
};

const activeStyle = {
  backgroundColor: "#2563eb",
  color: "#ffffff",
};

const subLinkStyle = {
  display: "block",
  padding: "8px 12px",
  marginLeft: "15px",
  marginBottom: "6px",
  color: "#94a3b8",
  textDecoration: "none",
  borderRadius: "6px",
  fontSize: "14px",
};

const ServiceProviderLayout = () => {
  const [openSpaces, setOpenSpaces] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* Sidebar */}
      <aside
        style={{
          width: "240px",
          background: "#1e293b",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Service Provider
        </h2>

        <nav>
          {/* Dashboard */}
          <NavLink
            to="/service-provider/dashboard"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            Dashboard
          </NavLink>

          {/* 🔽 My Spaces with Dropdown */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <NavLink
                to="/service-provider/my-spaces"
                style={({ isActive }) =>
                  isActive ? { ...linkStyle, ...activeStyle } : linkStyle
                }
              >
                My Spaces
              </NavLink>

              <span
                onClick={() => setOpenSpaces(!openSpaces)}
                style={{
                  color: "#cbd5e1",
                  paddingRight: "10px",
                  userSelect: "none",
                }}
              >
                {openSpaces ? "▲" : "▼"}
              </span>
            </div>

            {/* Dropdown Items */}
            {openSpaces && (
              <div>
                <NavLink
                  to="/service-provider/add-space"
                  style={subLinkStyle}
                >
                  ➕ Add Space
                </NavLink>

                <NavLink
                  to="/service-provider/my-spaces"
                  style={subLinkStyle}
                >
                  ✏️ Edit Space
                </NavLink>

                <NavLink
                  to="/service-provider/my-spaces"
                  style={subLinkStyle}
                >
                  🔄 Change Availability
                </NavLink>
              </div>
            )}
          </div>

          {/* Other links */}
          <NavLink
            to="/service-provider/bookings"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            Bookings
          </NavLink>

          <NavLink
            to="/service-provider/tasks"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            Tasks
          </NavLink>

          <NavLink
            to="/service-provider/payments"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            Payments
          </NavLink>

          <NavLink
            to="/service-provider/reports"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            Reports
          </NavLink>

          <NavLink
            to="/service-provider/notifications"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            Notifications
          </NavLink>
        </nav>
      </aside>

      {/* Page Content */}
      <main style={{ flex: 1, padding: "20px", background: "#f7f9fc" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default ServiceProviderLayout;
