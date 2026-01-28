import { useEffect, useState } from "react";
import "./Bookings.css";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, confirmed, completed, cancelled

  // Fetch all provider bookings
  useEffect(() => {
    fetch("http://localhost:8000/provider/bookings/")
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  }, []);

  // Update booking status
  const updateStatus = async (bookingId, newStatus) => {
    try {
      const res = await fetch(
        `http://localhost:8000/provider/bookings/${bookingId}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ booking_status: newStatus })
        }
      );

      if (!res.ok) throw new Error("Failed to update status");

      // Update state locally
      setBookings(bookings.map(b =>
        b.id === bookingId ? { ...b, booking_status: newStatus } : b
      ));
    } catch (error) {
      console.error(error);
      alert("Could not update booking status");
    }
  };

  // Filter bookings
  const filteredBookings = bookings.filter(b => {
    if (filter === "all") return true;
    return b.booking_status === filter;
  });

  // Stats
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.booking_status === "pending").length,
    confirmed: bookings.filter(b => b.booking_status === "confirmed").length,
    completed: bookings.filter(b => b.booking_status === "completed").length,
    cancelled: bookings.filter(b => b.booking_status === "cancelled").length,
  };

  return (
    <div className="manage-bookings">
      {/* Header */}
      <div className="bookings-header">
        <div>
          <h2 className="page-title">Manage Bookings</h2>
          <p className="page-subtitle">Track and manage all your space bookings</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-row">
        <div className="stat-card" onClick={() => setFilter("all")}>
          <div className="stat-icon-wrapper blue-bg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <div>
            <p className="stat-label">Total Bookings</p>
            <p className="stat-value">{stats.total}</p>
          </div>
        </div>

        <div className="stat-card" onClick={() => setFilter("pending")}>
          <div className="stat-icon-wrapper orange-bg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div>
            <p className="stat-label">Pending</p>
            <p className="stat-value">{stats.pending}</p>
          </div>
        </div>

        <div className="stat-card" onClick={() => setFilter("confirmed")}>
          <div className="stat-icon-wrapper blue-bg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div>
            <p className="stat-label">Confirmed</p>
            <p className="stat-value">{stats.confirmed}</p>
          </div>
        </div>

        <div className="stat-card" onClick={() => setFilter("completed")}>
          <div className="stat-icon-wrapper green-bg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <div>
            <p className="stat-label">Completed</p>
            <p className="stat-value">{stats.completed}</p>
          </div>
        </div>

        <div className="stat-card" onClick={() => setFilter("cancelled")}>
          <div className="stat-icon-wrapper red-bg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
          <div>
            <p className="stat-label">Cancelled</p>
            <p className="stat-value">{stats.cancelled}</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button
          className={`filter-tab ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All ({stats.total})
        </button>
        <button
          className={`filter-tab ${filter === "pending" ? "active" : ""}`}
          onClick={() => setFilter("pending")}
        >
          Pending ({stats.pending})
        </button>
        <button
          className={`filter-tab ${filter === "confirmed" ? "active" : ""}`}
          onClick={() => setFilter("confirmed")}
        >
          Confirmed ({stats.confirmed})
        </button>
        <button
          className={`filter-tab ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed ({stats.completed})
        </button>
        <button
          className={`filter-tab ${filter === "cancelled" ? "active" : ""}`}
          onClick={() => setFilter("cancelled")}
        >
          Cancelled ({stats.cancelled})
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading bookings...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && bookings.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <h3>No Bookings Yet</h3>
          <p>You don't have any bookings at the moment</p>
        </div>
      )}

      {/* Bookings Table */}
      {!loading && filteredBookings.length > 0 && (
        <div className="table-container">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Space</th>
                <th>User</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map(b => (
                <tr key={b.id}>
                  <td>
                    <div className="space-cell">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="7" width="20" height="14" rx="2"/>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                      </svg>
                      {b.space_name}
                    </div>
                  </td>
                  <td>
                    <div className="user-cell">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      {b.user_name}
                    </div>
                  </td>
                  <td>
                    <div className="date-cell">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      {b.booking_date}
                    </div>
                  </td>
                  <td>
                    <div className="time-cell">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {`${b.start_time} - ${b.end_time}`}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${b.booking_status}`}>
                      {b.booking_status}
                    </span>
                  </td>
                  <td>
                    <span className={`payment-badge ${b.payment_status}`}>
                      {b.payment_status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {b.booking_status === "pending" && (
                        <>
                          <button
                            className="action-btn approve-btn"
                            onClick={() => updateStatus(b.id, "confirmed")}
                            title="Approve Booking"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            Approve
                          </button>
                          <button
                            className="action-btn reject-btn"
                            onClick={() => updateStatus(b.id, "cancelled")}
                            title="Reject Booking"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="18" y1="6" x2="6" y2="18"/>
                              <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                            Reject
                          </button>
                        </>
                      )}

                      {b.booking_status === "confirmed" && (
                        <button
                          className="action-btn complete-btn"
                          onClick={() => updateStatus(b.id, "completed")}
                          title="Mark as Completed"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                          </svg>
                          Complete
                        </button>
                      )}

                      {(b.booking_status === "completed" || b.booking_status === "cancelled") && (
                        <span className="no-action">No Action</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No Results State */}
      {!loading && bookings.length > 0 && filteredBookings.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <h3>No Bookings Found</h3>
          <p>No bookings match the selected filter</p>
        </div>
      )}
    </div>
  );
}