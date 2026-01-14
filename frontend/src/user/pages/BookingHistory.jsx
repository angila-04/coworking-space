import { useBooking } from "../context/BookingContext";

function BookingHistory() {
  const { bookings } = useBooking();

  return (
    <div className="page">
      <h1>Booking History</h1>
      <p>Your past and upcoming workspace bookings at SPACETRIX.</p>

      {bookings.length === 0 ? (
        <p className="empty">No bookings found.</p>
      ) : (
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time Slot</th>
                <th>Seats</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.date}</td>
                  <td>{booking.slot}</td>
                  <td>{booking.seats}</td>
                  <td>₹ {booking.amount}</td>
                  <td>
                    <span className="status success">Confirmed</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BookingHistory;
