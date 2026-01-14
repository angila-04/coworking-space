import { useState } from "react";

function Support() {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("Booking");
  const [priority, setPriority] = useState("Normal");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setMessage("");
  };

  return (
    <div className="page route-page">
      <h1>Support</h1>
      <p>We’re here to help you resolve issues quickly and smoothly.</p>

      <div className="support-layout">
        {/* SUPPORT FORM */}
        <div className="support-card">
          <h3>Raise a Support Ticket</h3>

          {submitted && (
            <div className="support-success">
              ✅ Your request has been submitted. Our team will contact you shortly.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label>Issue Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Booking</option>
              <option>Payment</option>
              <option>Check-in / Access</option>
              <option>Technical Issue</option>
              <option>Other</option>
            </select>

            <label>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Normal</option>
              <option>Urgent</option>
            </select>

            <label>Describe your issue</label>
            <textarea
              placeholder="Please describe the issue in detail..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <button className="btn primary full" type="submit">
              Submit Ticket
            </button>
          </form>
        </div>

        {/* SUPPORT INFO */}
        <div className="support-info">
          <h3>Support Availability</h3>

          <ul>
            <li>🕘 9:00 AM – 9:00 PM (Mon–Sat)</li>
            <li>⚡ Average response time: under 2 hours</li>
            <li>🔐 Secure ticket handling</li>
          </ul>

          <div className="support-cta">
            <h4>Need quick answers?</h4>
            <p>Check our frequently asked questions for instant help.</p>
            <button className="btn secondary">View FAQs</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
