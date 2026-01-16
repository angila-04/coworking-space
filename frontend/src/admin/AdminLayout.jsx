import "./admin.css";
import { Link, Navigate, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const role = localStorage.getItem("role");

  // 🔒 Protect admin routes
  if (role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-layout" style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/spaces">Spaces</Link>
        <Link to="/admin/bookings">Bookings</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/services">Services</Link>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>

    </div>
  );
}
