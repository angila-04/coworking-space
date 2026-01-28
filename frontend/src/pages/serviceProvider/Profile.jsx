import { useState, useEffect } from "react";
import "./Profile.css";

export default function ManageProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    // Profile Info
    profilePhoto: null,
    providerName: "",
    companyName: "",
    email: "",
    phone: "",
    
    // Business Details
    businessLicense: "",
    gstNumber: "",
    businessType: "",
    yearEstablished: "",
    
    // Address
    address: "",
    city: "",
    state: "",
    pincode: "",
    
    // Payment Details
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
    
    // Preferences
    emailNotifications: true,
    smsNotifications: false,
    bookingAlerts: true,
    marketingEmails: false,
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [documents, setDocuments] = useState({
    businessLicense: null,
    gstCertificate: null,
    idProof: null,
    addressProof: null,
  });

  // Fetch profile data
  useEffect(() => {
    // Replace with your API endpoint
    // fetch("http://localhost:8000/provider/profile")
    //   .then(res => res.json())
    //   .then(data => setProfileData(data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (field === "profilePhoto") {
      setProfileData(prev => ({
        ...prev,
        profilePhoto: URL.createObjectURL(file)
      }));
    } else {
      setDocuments(prev => ({
        ...prev,
        [field]: file
      }));
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    // Replace with your API endpoint
    // await fetch("http://localhost:8000/provider/profile", {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(profileData)
    // });
    setTimeout(() => {
      setLoading(false);
      alert("Profile updated successfully!");
    }, 1000);
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    setLoading(true);
    // Replace with your API endpoint
    // await fetch("http://localhost:8000/provider/change-password", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(passwordData)
    // });
    setTimeout(() => {
      setLoading(false);
      alert("Password changed successfully!");
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    }, 1000);
  };

  const tabs = [
    { id: "profile", label: "Profile Info", icon: "👤" },
    { id: "business", label: "Business Details", icon: "🏢" },
    { id: "payment", label: "Payment Details", icon: "💳" },
    { id: "documents", label: "Documents", icon: "📄" },
    { id: "security", label: "Security", icon: "🔒" },
    { id: "preferences", label: "Preferences", icon: "⚙️" },
  ];

  return (
    <div className="manage-profile">
      {/* Header */}
      <div className="profile-header">
        <div>
          <h2 className="page-title">Manage Profile</h2>
          <p className="page-subtitle">Update your personal and business information</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-container">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Profile Info Tab */}
        {activeTab === "profile" && (
          <div className="profile-section">
            <h3 className="section-title">Profile Information</h3>
            
            {/* Profile Photo */}
            <div className="photo-upload-section">
              <div className="photo-preview">
                {profileData.profilePhoto ? (
                  <img src={profileData.profilePhoto} alt="Profile" />
                ) : (
                  <div className="photo-placeholder">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                )}
              </div>
              <div className="photo-upload-actions">
                <label className="upload-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "profilePhoto")}
                    hidden
                  />
                </label>
                <p className="upload-hint">JPG, PNG or GIF. Max size 2MB</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="form-grid">
              <div className="form-group">
                <label>Provider Name *</label>
                <input
                  type="text"
                  name="providerName"
                  value={profileData.providerName}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={profileData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter company name"
                />
              </div>

              <div className="form-group">
                <label>Email ID</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  placeholder="email@example.com"
                  readOnly
                  className="readonly-input"
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>

            {/* Address Section */}
            <h4 className="subsection-title">Address Details</h4>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Address *</label>
                <textarea
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  placeholder="Enter full address"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={profileData.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                />
              </div>

              <div className="form-group">
                <label>State *</label>
                <input
                  type="text"
                  name="state"
                  value={profileData.state}
                  onChange={handleInputChange}
                  placeholder="Enter state"
                />
              </div>

              <div className="form-group">
                <label>Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  value={profileData.pincode}
                  onChange={handleInputChange}
                  placeholder="000000"
                />
              </div>
            </div>

            <button className="save-btn" onClick={handleSaveProfile} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}

        {/* Business Details Tab */}
        {activeTab === "business" && (
          <div className="profile-section">
            <h3 className="section-title">Business Information</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Business License Number</label>
                <input
                  type="text"
                  name="businessLicense"
                  value={profileData.businessLicense}
                  onChange={handleInputChange}
                  placeholder="Enter license number"
                />
              </div>

              <div className="form-group">
                <label>GST Number</label>
                <input
                  type="text"
                  name="gstNumber"
                  value={profileData.gstNumber}
                  onChange={handleInputChange}
                  placeholder="22AAAAA0000A1Z5"
                />
              </div>

              <div className="form-group">
                <label>Business Type</label>
                <select
                  name="businessType"
                  value={profileData.businessType}
                  onChange={handleInputChange}
                >
                  <option value="">Select type</option>
                  <option value="individual">Individual</option>
                  <option value="partnership">Partnership</option>
                  <option value="private_limited">Private Limited</option>
                  <option value="llp">LLP</option>
                </select>
              </div>

              <div className="form-group">
                <label>Year Established</label>
                <input
                  type="text"
                  name="yearEstablished"
                  value={profileData.yearEstablished}
                  onChange={handleInputChange}
                  placeholder="2020"
                />
              </div>
            </div>

            <button className="save-btn" onClick={handleSaveProfile} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}

        {/* Payment Details Tab */}
        {activeTab === "payment" && (
          <div className="profile-section">
            <h3 className="section-title">Payment Information</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  value={profileData.bankName}
                  onChange={handleInputChange}
                  placeholder="Enter bank name"
                />
              </div>

              <div className="form-group">
                <label>Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={profileData.accountNumber}
                  onChange={handleInputChange}
                  placeholder="Enter account number"
                />
              </div>

              <div className="form-group">
                <label>IFSC Code</label>
                <input
                  type="text"
                  name="ifscCode"
                  value={profileData.ifscCode}
                  onChange={handleInputChange}
                  placeholder="ABCD0123456"
                />
              </div>

              <div className="form-group">
                <label>UPI ID</label>
                <input
                  type="text"
                  name="upiId"
                  value={profileData.upiId}
                  onChange={handleInputChange}
                  placeholder="yourname@upi"
                />
              </div>
            </div>

            <button className="save-btn" onClick={handleSaveProfile} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div className="profile-section">
            <h3 className="section-title">Documents Upload</h3>
            
            <div className="documents-grid">
              {[
                { id: "businessLicense", label: "Business License", icon: "📋" },
                { id: "gstCertificate", label: "GST Certificate", icon: "📜" },
                { id: "idProof", label: "ID Proof", icon: "🆔" },
                { id: "addressProof", label: "Address Proof", icon: "📍" },
              ].map(doc => (
                <div key={doc.id} className="document-card">
                  <div className="document-icon">{doc.icon}</div>
                  <h4>{doc.label}</h4>
                  {documents[doc.id] ? (
                    <div className="document-uploaded">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>{documents[doc.id].name}</span>
                      <button
                        className="remove-doc-btn"
                        onClick={() => setDocuments(prev => ({ ...prev, [doc.id]: null }))}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="upload-doc-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                      Upload
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(e, doc.id)}
                        hidden
                      />
                    </label>
                  )}
                  <p className="doc-hint">PDF, JPG, PNG (Max 5MB)</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="profile-section">
            <h3 className="section-title">Change Password</h3>
            
            <div className="form-grid security-form">
              <div className="form-group full-width">
                <label>Old Password *</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter old password"
                />
              </div>

              <div className="form-group">
                <label>New Password *</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                />
              </div>

              <div className="form-group">
                <label>Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="password-requirements">
              <h4>Password Requirements:</h4>
              <ul>
                <li>At least 8 characters long</li>
                <li>Contains uppercase and lowercase letters</li>
                <li>Contains at least one number</li>
                <li>Contains at least one special character</li>
              </ul>
            </div>

            <button className="save-btn" onClick={handleChangePassword} disabled={loading}>
              {loading ? "Updating..." : "Change Password"}
            </button>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === "preferences" && (
          <div className="profile-section">
            <h3 className="section-title">Notification Preferences</h3>
            
            <div className="preferences-list">
              <div className="preference-item">
                <div className="preference-info">
                  <h4>Email Notifications</h4>
                  <p>Receive email updates about your bookings</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={profileData.emailNotifications}
                    onChange={handleInputChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="preference-item">
                <div className="preference-info">
                  <h4>SMS Notifications</h4>
                  <p>Get SMS alerts for important updates</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    name="smsNotifications"
                    checked={profileData.smsNotifications}
                    onChange={handleInputChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="preference-item">
                <div className="preference-info">
                  <h4>Booking Alerts</h4>
                  <p>Notify me when new bookings are made</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    name="bookingAlerts"
                    checked={profileData.bookingAlerts}
                    onChange={handleInputChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="preference-item">
                <div className="preference-info">
                  <h4>Marketing Emails</h4>
                  <p>Receive promotional offers and updates</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    name="marketingEmails"
                    checked={profileData.marketingEmails}
                    onChange={handleInputChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <button className="save-btn" onClick={handleSaveProfile} disabled={loading}>
              {loading ? "Saving..." : "Save Preferences"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}