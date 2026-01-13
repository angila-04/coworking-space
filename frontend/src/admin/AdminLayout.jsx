import { Link, Outlet } from "react-router-dom";
import "./admin.css";

function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>
      
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/spaces">Spaces</Link>
        <Link to="/bookings">Bookings</Link>
        <Link to="/users">Users</Link>
        <Link to="/services">Services</Link>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>

    </div>
  );
}

export default AdminLayout;
