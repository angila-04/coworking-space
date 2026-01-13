import { useBooking } from "../context/BookingContext";
import { QRCodeCanvas } from "qrcode.react";

function CheckIn() {
  const { bookings } = useBooking();

  if (bookings.length === 0) {
    return (
      <div className="page">
        <h1>Check-in</h1>
        <p className="empty">No active bookings available.</p>
      </div>
    );
  }

  const latestBooking = bookings[bookings.length - 1];

  const qrData = JSON.stringify({
    brand: "SPACETRIX",
    location: "Thrissur",
    date: latestBooking.date,
    slot: latestBooking.slot,
    seats: latestBooking.seats,
    amount: latestBooking.amount
  });

  return (
    <div className="page">
      <h1>Check-in</h1>
      <p>
        Show this QR code at the SPACETRIX front desk to check in to your
        workspace.
      </p>

      <div className="qr-box">
        <QRCodeCanvas value={qrData} size={180} />

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <strong>SPACETRIX – Thrissur</strong>
          <p>{latestBooking.date}</p>
          <p>{latestBooking.slot}</p>
        </div>
      </div>
    </div>
  );
}

export default CheckIn;
