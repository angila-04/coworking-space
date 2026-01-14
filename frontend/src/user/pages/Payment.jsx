function Payment() {
  return (
    <div className="page">
      <h1>Confirm & Pay</h1>
      <p>
        Review your booking details and complete the payment securely to confirm
        your workspace at SPACETRIX.
      </p>

      <div className="booking-layout">
        {/* LEFT */}
        <div className="booking-card">
          <h3>Payment Method</h3>

          <div className="amenities-grid">
            <div className="amenity">💳 Credit / Debit Card</div>
            <div className="amenity">📱 UPI (Google Pay, PhonePe)</div>
            <div className="amenity">🏦 Net Banking</div>
          </div>

          <p style={{ marginTop: "20px", color: "var(--text-muted)" }}>
            Payments are encrypted and processed securely.
          </p>
        </div>

        {/* RIGHT */}
        <div className="booking-summary">
          <h3>Order Summary</h3>

          <div className="summary-item">
            <span>Workspace</span>
            <span>SPACETRIX Thrissur</span>
          </div>

          <div className="summary-item">
            <span>Seats</span>
            <span>2</span>
          </div>

          <div className="summary-item">
            <span>Duration</span>
            <span>Full Day</span>
          </div>

          <div className="summary-divider" />

          <div className="summary-item total">
            <span>Total Amount</span>
            <span>₹ 998</span>
          </div>

          <button className="btn success full">
            Pay & Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
