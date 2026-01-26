import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const providerId = localStorage.getItem("provider_id");

  const [stats, setStats] = useState({
    totalSpaces: 0,
    activeBookings: 0,
    todaysBookings: 0,
    pendingRequests: 0,
    earnings: 0,
  });

  const [loading, setLoading] = useState(true);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const fetchDashboardStats = async () => {
    if (!providerId) {
      console.error("Provider ID missing");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:8000/service-provider/dashboard/${providerId}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch dashboard");
      }

      const data = await res.json();
      setStats(data.stats);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (providerId) {
      fetchDashboardStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerId]);

  const handleEnquiryChange = (e) => {
    const { name, value } = e.target;
    setEnquiryForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!enquiryForm.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!enquiryForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(enquiryForm.email)) {
      errors.email = "Email is invalid";
    }
    
    if (!enquiryForm.phone.trim()) {
      errors.phone = "Phone is required";
    } else if (!/^\+?[\d\s-]{10,}$/.test(enquiryForm.phone)) {
      errors.phone = "Phone number is invalid";
    }
    
    if (!enquiryForm.subject.trim()) {
      errors.subject = "Subject is required";
    }
    
    if (!enquiryForm.message.trim()) {
      errors.message = "Message is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("http://localhost:8000/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...enquiryForm,
          type: "service_provider",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit enquiry");
      }

      setSubmitSuccess(true);
      
      // Reset form and close modal after 2 seconds
      setTimeout(() => {
        setShowEnquiryModal(false);
        setSubmitSuccess(false);
        setEnquiryForm({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setFormErrors({});
      }, 2000);
    } catch (err) {
      console.error("Enquiry submission error:", err);
      alert("Failed to submit enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    if (!submitting) {
      setShowEnquiryModal(false);
      setSubmitSuccess(false);
      setEnquiryForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setFormErrors({});
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard Overview</h1>
          <p className="dashboard-subtitle">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="header-actions">
          <button 
            className="enquiry-btn" 
            onClick={() => setShowEnquiryModal(true)}
            aria-label="Submit Enquiry"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Submit Enquiry
          </button>

          {/* <button className="refresh-btn" onClick={fetchDashboardStats}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
            </svg>
            Refresh
          </button> */}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {/* Total Spaces Card */}
        <div className="stat-card blue">
          <div className="stat-icon-wrapper blue-bg">
            <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Spaces</p>
            <h2 className="stat-value">{stats.totalSpaces}</h2>
            <span className="stat-badge">Active</span>
          </div>
        </div>

        {/* Active Bookings Card */}
        <div className="stat-card green">
          <div className="stat-icon-wrapper green-bg">
            <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
              <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Active Bookings</p>
            <h2 className="stat-value">{stats.activeBookings}</h2>
            <span className="stat-badge green">Ongoing</span>
          </div>
        </div>

        {/* Today's Bookings Card */}
        <div className="stat-card purple">
          <div className="stat-icon-wrapper purple-bg">
            <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Today's Bookings</p>
            <h2 className="stat-value">{stats.todaysBookings}</h2>
            <span className="stat-badge purple">Today</span>
          </div>
        </div>

        {/* Pending Requests Card */}
        <div className="stat-card orange">
          <div className="stat-icon-wrapper orange-bg">
            <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Pending Requests</p>
            <h2 className="stat-value">{stats.pendingRequests}</h2>
            <span className="stat-badge orange">Action Required</span>
          </div>
        </div>

        {/* Total Earnings Card - Featured */}
        <div className="stat-card featured">
          <div className="stat-icon-wrapper featured-bg">
            <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Earnings</p>
            <h2 className="stat-value earnings">₹ {stats.earnings.toLocaleString('en-IN')}</h2>
            <span className="stat-badge success">Revenue</span>
          </div>
        </div>
      </div>

      

      {/* Enquiry Modal */}
      {showEnquiryModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2 className="modal-title">Submit Enquiry</h2>
                <p className="modal-subtitle">We'll get back to you as soon as possible</p>
              </div>
              <button
                className="modal-close"
                onClick={closeModal}
                disabled={submitting}
                aria-label="Close modal"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {submitSuccess ? (
              <div className="success-message">
                <div className="success-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3>Enquiry Submitted Successfully!</h3>
                <p>Thank you for reaching out. Our team will review your enquiry and get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="enquiry-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      Full Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={enquiryForm.name}
                      onChange={handleEnquiryChange}
                      placeholder="Enter your full name"
                      className={formErrors.name ? "error" : ""}
                    />
                    {formErrors.name && <span className="error-text">{formErrors.name}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={enquiryForm.email}
                      onChange={handleEnquiryChange}
                      placeholder="your@email.com"
                      className={formErrors.email ? "error" : ""}
                    />
                    {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">
                      Phone Number <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={enquiryForm.phone}
                      onChange={handleEnquiryChange}
                      placeholder="+91 XXXXX XXXXX"
                      className={formErrors.phone ? "error" : ""}
                    />
                    {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">
                      Subject <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={enquiryForm.subject}
                      onChange={handleEnquiryChange}
                      placeholder="What's this about?"
                      className={formErrors.subject ? "error" : ""}
                    />
                    {formErrors.subject && <span className="error-text">{formErrors.subject}</span>}
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={enquiryForm.message}
                    onChange={handleEnquiryChange}
                    rows="6"
                    placeholder="Tell us more about your enquiry..."
                    className={formErrors.message ? "error" : ""}
                  ></textarea>
                  {formErrors.message && <span className="error-text">{formErrors.message}</span>}
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={closeModal}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-submit"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <div className="btn-spinner"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="22" y1="2" x2="11" y2="13"/>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                        Submit Enquiry
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;