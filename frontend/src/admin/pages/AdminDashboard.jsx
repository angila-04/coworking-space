import "../admin.css";


function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="dashboard-cards">
        <div className="card">
          <h2>Total Spaces</h2>
          <p>12</p>
        </div>

        <div className="card">
          <h2>Total Users</h2>
          <p>245</p>
        </div>

        <div className="card">
          <h2>Total Bookings</h2>
          <p>89</p>
        </div>

        <div className="card">
          <h2>Pending Requests</h2>
          <p>7</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
