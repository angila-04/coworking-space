import React, { useEffect, useState } from "react";
import "./Payments.css";
import axios from "axios";


const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/payments/provider");
      setPayments(res.data);
    } catch (error) {
      console.error("Error fetching payments", error);
    } finally {
      setLoading(false);
    }
  };

  const totalEarnings = payments
    .filter(p => p.payment_status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="payments-page">
      <h2>Payments & Earnings</h2>

      <div className="earnings-card">
        <h3>Total Earnings</h3>
        <p>₹ {totalEarnings}</p>
      </div>

      {loading ? (
        <p className="loading">Loading payments...</p>
      ) : payments.length === 0 ? (
        <p className="empty">No payments found</p>
      ) : (
        <table className="payments-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Space</th>
              <th>User</th>
              <th>Date</th>
              <th>Amount (₹)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.booking_id}>
                <td>{payment.booking_id}</td>
                <td>{payment.space_name}</td>
                <td>{payment.user_name}</td>
                <td>{payment.booking_date}</td>
                <td>{payment.amount}</td>
                <td>
                  <span
                    className={
                      payment.payment_status === "paid"
                        ? "status paid"
                        : "status pending"
                    }
                  >
                    {payment.payment_status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Payments;
