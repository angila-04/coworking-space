import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* Sidebar */}
      <aside style={{
        width: "220px",
        background: "#1f2937",
        color: "#fff",
        padding: "20px"
      }}>
        <h2>Admin Panel</h2>
        <nav style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link to="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>Dashboard</Link>
          <Link to="/spaces" style={{ color: "#fff", textDecoration: "none" }}>Spaces</Link>
          <Link to="/bookings" style={{ color: "#fff", textDecoration: "none" }}>Bookings</Link>
          <Link to="/users" style={{ color: "#fff", textDecoration: "none" }}>Users</Link>
          <Link to="/services" style={{ color: "#fff", textDecoration: "none" }}>Services</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>

    </div>
  );
}

export default AdminLayout;
