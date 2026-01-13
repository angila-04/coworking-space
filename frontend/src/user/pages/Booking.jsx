import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

function Booking() {
  const navigate = useNavigate();
  const { addBooking } = useBooking();

  const [date, setDate] = useState("");
  const [seats, setSeats] = useState(1);
  const [slot, setSlot] = useState("");

  const pricePerSeat = 499;
  const totalAmount = seats * pricePerSeat;

  const handleProceed = () => {
    if (!date || !slot) {
      alert("Please select date and time slot");
      return;
    }

    addBooking({
      date,
      slot,
      seats,
      amount: totalAmount
    });

    navigate("/user/payment");
  };

  return (
    <div className="page">
      <h1>Book Your Workspace</h1>
      <p>
        Reserve your preferred workspace at SPACETRIX, Thrissur by selecting
        a date, time slot, and number of seats.
      </p>

      <div className="booking-layout">
        {/* LEFT SIDE */}
        <div>
          {/* DATE */}
          <div className="booking-card">
            <h3>Select Date</h3>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* TIME SLOT */}
          <div className="booking-card">
            <h3>Select Time Slot</h3>
            <div className="slot-grid">
              {["Morning", "Afternoon", "Full Day"].map((time) => (
                <div
                  key={time}
                  className={`slot ${slot === time ? "active" : ""}`}
                  onClick={() => setSlot(time)}
                >
                  {time}
                </div>
              ))}
            </div>
          </div>

          {/* SEATS */}
          <div className="booking-card">
            <h3>Number of Seats</h3>
            <div className="seat-control">
              <button onClick={() => setSeats(Math.max(1, seats - 1))}>−</button>
              <span>{seats}</span>
              <button onClick={() => setSeats(seats + 1)}>+</button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — SUMMARY */}
        <div className="booking-summary">
          <h3>Booking Summary</h3>

          <div className="summary-item">
            <span>Location</span>
            <span>SPACETRIX – Thrissur</span>
          </div>

          <div className="summary-item">
            <span>Date</span>
            <span>{date || "Not selected"}</span>
          </div>

          <div className="summary-item">
            <span>Time Slot</span>
            <span>{slot || "Not selected"}</span>
          </div>

          <div className="summary-item">
            <span>Seats</span>
            <span>{seats}</span>
          </div>

          <div className="summary-divider" />

          <div className="summary-item total">
            <span>Total Amount</span>
            <span>₹ {totalAmount}</span>
          </div>

          <button className="btn primary full" onClick={handleProceed}>
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Booking;
