import { useEffect, useState } from "react";
import "./BookingManagement.css";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/bookings")
      .then(res => res.json())
      .then(data => setBookings(data));
  }, []);

  const updateStatus = (userName, status) => {
    fetch(`http://127.0.0.1:8000/bookings/${userName}?status=${status}`, {
      method: "PUT"
    })
      .then(() => {
        setBookings(prev =>
          prev.map(b =>
            b.user_name === userName ? { ...b, status } : b
          )
        );
      });
  };

  return (
    <div className="booking-container">
      <h2>Booking Management</h2>

      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Space</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b, i) => (
            <tr key={i}>
              <td>{b.user_name}</td>
              <td>{b.space_name}</td>
              <td>{b.date}</td>
              <td>{b.time}</td>
              <td>{b.status}</td>
              <td>
                <button onClick={() => updateStatus(b.user_name, "Approved")}>
                  Approve
                </button>
                <button onClick={() => updateStatus(b.user_name, "Rejected")}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingManagement;
