import "./PaymentsBilling.css";

const PaymentsBilling = () => {
  // Dummy payment data (frontend only)
  const payments = [
    {
      id: 1,
      date: "08 Jan 2026",
      bookingId: "BK1023",
      space: "Private Office A",
      amount: 2000,
      status: "Paid"
    },
    {
      id: 2,
      date: "06 Jan 2026",
      bookingId: "BK1019",
      space: "Meeting Room",
      amount: 1500,
      status: "Paid"
    },
    {
      id: 3,
      date: "05 Jan 2026",
      bookingId: "BK1012",
      space: "Open Desk",
      amount: 800,
      status: "Pending"
    }
  ];

  const totalEarnings = payments
    .filter(p => p.status === "Paid")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="payments-container">
      <h1>Payments & Billing</h1>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="payment-cards">
        <div className="payment-card">
          <h3>Total Earnings</h3>
          <p>₹{totalEarnings}</p>
        </div>

        <div className="payment-card">
          <h3>Paid Transactions</h3>
          <p>{payments.filter(p => p.status === "Paid").length}</p>
        </div>

        <div className="payment-card">
          <h3>Pending Payments</h3>
          <p>{payments.filter(p => p.status === "Pending").length}</p>
        </div>
      </div>

      {/* ===== PAYMENT TABLE ===== */}
      <div className="payment-table-section">
        <h2>Transaction History</h2>

        <table className="payment-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Booking ID</th>
              <th>Space</th>
              <th>Amount (₹)</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.date}</td>
                <td>{payment.bookingId}</td>
                <td>{payment.space}</td>
                <td>{payment.amount}</td>
                <td className={`status ${payment.status.toLowerCase()}`}>
                  {payment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsBilling;
