import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="sp-dashboard">
      <h1>Service Provider Dashboard</h1>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Spaces</h3>
          <p>3</p>
        </div>

        <div className="card">
          <h3>Active Bookings</h3>
          <p>8</p>
        </div>

        <div className="card">
          <h3>Total Earnings</h3>
          <p>₹25,000</p>
        </div>

        <div className="card">
          <h3>Pending Requests</h3>
          <p>2</p>
        </div>
      </div>

      {/* ===== RECENT BOOKINGS ===== */}
      <div className="dashboard-section">
        <h2>Recent Bookings</h2>

        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Space</th>
              <th>User</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Private Office A</td>
              <td>Rahul</td>
              <td>10 Jan 2026</td>
              <td className="status confirmed">Confirmed</td>
            </tr>
            <tr>
              <td>Meeting Room</td>
              <td>Anita</td>
              <td>12 Jan 2026</td>
              <td className="status pending">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ===== QUICK ACTIONS ===== */}
      <div className="dashboard-section">
        <h2>Quick Actions</h2>

        <div className="quick-actions">
          <button>Add New Space</button>
          <button>View Payments</button>
          <button>View Reports</button>
          <button>Manage Tasks</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
