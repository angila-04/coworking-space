import { useBooking } from "../context/BookingContext";

function Dashboard() {
  const { bookings } = useBooking();

  // ===== INSIGHTS =====
  const totalBookings = bookings.length;

  const totalSpent = bookings.reduce(
    (sum, booking) => sum + booking.amount,
    0
  );

  const upcomingBooking =
    bookings.length > 0 ? bookings[bookings.length - 1] : null;

  return (
    <div className="page">
      {/* ===== HEADER ===== */}
      <div className="dashboard-header">
        <div>
          <h1>Welcome to SPACETRIX</h1>
          <p>Your workspace activity at a glance</p>
        </div>
      </div>

      {/* ===== STATS ===== */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <span>📅</span>
          <div>
            <h3>{totalBookings}</h3>
            <p>Total Bookings</p>
          </div>
        </div>

        <div className="stat-card">
          <span>💰</span>
          <div>
            <h3>₹ {totalSpent}</h3>
            <p>Total Spend</p>
          </div>
        </div>

        <div className="stat-card">
          <span>🏢</span>
          <div>
            <h3>
              {upcomingBooking ? "Active" : "None"}
            </h3>
            <p>Current Booking</p>
          </div>
        </div>
      </div>

      {/* ===== MAIN GRID ===== */}
      <div className="dashboard-grid">
        {/* ===== UPCOMING BOOKING ===== */}
        <div className="dashboard-card">
          <h3>Upcoming Booking</h3>

          {upcomingBooking ? (
            <div className="booking-preview">
              <div>
                <p><strong>Date:</strong> {upcomingBooking.date}</p>
                <p><strong>Time Slot:</strong> {upcomingBooking.slot}</p>
                <p><strong>Seats:</strong> {upcomingBooking.seats}</p>
              </div>

              <span className="chip success">Confirmed</span>
            </div>
          ) : (
            <p className="empty">
              You don’t have any upcoming bookings.
            </p>
          )}
        </div>

        {/* ===== ACTIVITY ===== */}
        <div className="dashboard-card glass">
          <h3>Recent Activity</h3>

          {bookings.length > 0 ? (
            <ul className="activity-list">
              {bookings
                .slice(-5)
                .reverse()
                .map((booking, index) => (
                  <li key={index}>
                    Booked <strong>{booking.seats}</strong> seat(s) on{" "}
                    <strong>{booking.date}</strong> ({booking.slot})
                  </li>
                ))}
            </ul>
          ) : (
            <p className="empty">
              No activity yet. Start by booking a workspace.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
