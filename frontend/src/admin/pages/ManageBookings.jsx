import { useState } from "react";
import "../admin.css";

function ManageBookings() {
  const [bookings, setBookings] = useState([
    {
      id: 101,
      user: "John",
      space: "Downtown Hub",
      date: "2026-01-10",
      status: "pending",
    },
    {
      id: 102,
      user: "Sara",
      space: "Startup Bay",
      date: "2026-01-12",
      status: "approved",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id
          ? { ...booking, status: newStatus }
          : booking
      )
    );
  };

  return (
    <div>
      <h1>Manage Bookings</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Space</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.user}</td>
              <td>{booking.space}</td>
              <td>{booking.date}</td>
              <td>{booking.status}</td>
              <td>
                <button
                  onClick={() =>
                    updateStatus(booking.id, "approved")
                  }
                  disabled={booking.status === "approved"}
                >
                  Approve
                </button>{" "}
                <button
                  onClick={() =>
                    updateStatus(booking.id, "cancelled")
                  }
                  disabled={booking.status === "cancelled"}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageBookings;
