import { Link, Outlet } from "react-router-dom";

const ServiceProviderLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          background: "#1e293b",
          color: "#fff",
          padding: "20px"
        }}
      >
        <h2>Service Provider</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><Link to="/service-provider/dashboard" style={linkStyle}>Dashboard</Link></li>
            <li><Link to="/service-provider/tasks" style={linkStyle}>Assigned Tasks</Link></li>
            <li><Link to="/service-provider/payments" style={linkStyle}>Payments</Link></li>
            <li><Link to="/service-provider/reports" style={linkStyle}>Reports</Link></li>
            <li><Link to="/service-provider/activity-logs" style={linkStyle}>Activity Logs</Link></li>
            <li><Link to="/service-provider/notifications" style={linkStyle}>Notifications</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px", background: "#f8fafc" }}>
        <Outlet />
      </main>
    </div>
  );
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  display: "block",
  margin: "10px 0"
};

export default ServiceProviderLayout;
