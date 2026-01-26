import "./admin.css";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { LogOut, Bell } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminLayout() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications count
    fetch("http://localhost:8000/api/admin/notifications")
      .then(res => res.json())
      .then(data => {
        if (data.notifications) {
          setNotifications(data.notifications);
        }
      })
      .catch(err => console.error("Failed to fetch notifications:", err));
  }, []);

  if (role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="admin-container">
      <div className="admin-wrapper">
        <Outlet context={{ notifications, setNotifications }} />
      </div>
    </div>
  );
}