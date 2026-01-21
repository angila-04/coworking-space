import { useEffect, useState } from "react";
import "./Bookings.css";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);

  // Fetch all provider bookings
  useEffect(() => {
    fetch("http://localhost:8000/provider/bookings/")
      .then(res => res.json())
      .then(data => setBookings(data));
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

  return (
    <div className="manage-bookings">
      <h2>Manage Bookings</h2>

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
          {bookings.map(b => (
            <tr key={b.id}>
              <td>{b.space_name}</td>
              <td>{b.user_name}</td>
              <td>{b.booking_date}</td>
              <td>{`${b.start_time} - ${b.end_time}`}</td>
              <td className={`status ${b.booking_status}`}>{b.booking_status}</td>
              <td className={`status ${b.payment_status}`}>{b.payment_status}</td>
              <td>
                {b.booking_status === "pending" && (
                  <>
                    <button
                      className="action-btn approve-btn"
                      onClick={() => updateStatus(b.id, "confirmed")}
                    >
                      Approve
                    </button>
                    <button
                      className="action-btn reject-btn"
                      onClick={() => updateStatus(b.id, "cancelled")}
                    >
                      Reject
                    </button>
                  </>
                )}

                {b.booking_status === "confirmed" && (
                  <button
                    className="action-btn complete-btn"
                    onClick={() => updateStatus(b.id, "completed")}
                  >
                    Complete
                  </button>
                )}

                {(b.booking_status === "completed" || b.booking_status === "cancelled") && (
                  <span className="no-action">No Action</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
