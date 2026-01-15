import { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSpaces: 0,
    totalBookings: 0,
    pendingRequests: 0,
    totalEarnings: 0,
  });

  useEffect(() => {
      fetch("http://127.0.0.1:8000/service-provider/dashboard/1")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Service Provider Dashboard</h2>

      <div className="dashboard-cards">
        <Card title="Total Spaces" value={stats.totalSpaces} />
        <Card title="Total Bookings" value={stats.totalBookings} />
        <Card title="Pending Requests" value={stats.pendingRequests} />
        <Card title="Total Earnings (₹)" value={stats.totalEarnings} />
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="dashboard-card">
    <h4>{title}</h4>
    <h2>{value}</h2>
  </div>
);

export default Dashboard;
