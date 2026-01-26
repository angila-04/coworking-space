import React, { useState, useEffect, useCallback } from "react";
import {
  Users,
  Building2,
  AlertCircle,
  Mail,
  Briefcase,
  Bell,
  Loader,
  LogOut,
  Search,
  X,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "../admin.css";

const API_URL = "http://localhost:8000/api/admin";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [notifications, setNotifications] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [users, setUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [stats, setStats] = useState({
    totalSpaces: 0,
    totalUsers: 0,
    pendingSpaces: 0,
    pendingEnquiries: 0,
  });

  /* ---------------- API CALL ---------------- */
  const apiCall = useCallback(async (endpoint, method = "GET", body = null) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : null,
      });

      if (!res.ok) throw new Error("API error");
      return await res.json();
    } catch (err) {
      setError("⚠️ Failed to connect to server. Please ensure backend is running.");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    apiCall("/stats").then(d => d && setStats(d));
    apiCall("/notifications").then(d => d && setNotifications(d.notifications || []));
  }, [apiCall]);

  useEffect(() => {
    if (activeView === "spaces")
      apiCall("/spaces").then(d => d && setSpaces(d.spaces || []));
    if (activeView === "enquiries")
      apiCall("/enquiries").then(d => d && setEnquiries(d.enquiries || []));
    if (activeView === "users")
      apiCall("/users").then(d => d && setUsers(d.users || []));
  }, [activeView, apiCall]);

  /* ---------------- HANDLERS ---------------- */
  const updateSpaceStatus = async (id, status) => {
    const result = await apiCall(`/spaces/${id}`, "PUT", { status });
    if (result) {
      apiCall("/spaces").then(d => d && setSpaces(d.spaces || []));
      apiCall("/stats").then(d => d && setStats(d));
      apiCall("/notifications").then(d => d && setNotifications(d.notifications || []));
    }
  };

  const updateEnquiryStatus = async (id, status) => {
    const result = await apiCall(`/enquiries/${id}`, "PUT", { status });
    if (result) {
      apiCall("/enquiries").then(d => d && setEnquiries(d.enquiries || []));
    }
  };

  const deleteSpace = async (id) => {
    if (window.confirm("Are you sure you want to delete this space?")) {
      const result = await apiCall(`/spaces/${id}`, "DELETE");
      if (result) {
        apiCall("/spaces").then(d => d && setSpaces(d.spaces || []));
        apiCall("/stats").then(d => d && setStats(d));
      }
    }
  };

  const deleteEnquiry = async (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      const result = await apiCall(`/enquiries/${id}`, "DELETE");
      if (result) {
        apiCall("/enquiries").then(d => d && setEnquiries(d.enquiries || []));
      }
    }
  };

  const markNotificationRead = async (id) => {
    await apiCall(`/notifications/${id}`, "PUT");
    apiCall("/notifications").then(d => d && setNotifications(d.notifications || []));
  };

  const markAllNotificationsRead = async () => {
    await apiCall("/notifications/mark-all-read", "PUT");
    apiCall("/notifications").then(d => d && setNotifications(d.notifications || []));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  /* ---------------- FILTERING ---------------- */
  const filteredSpaces = spaces.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || s.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredEnquiries = enquiries.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         e.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || e.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  /* ---------------- UI COMPONENTS ---------------- */
  return (
    <>
      {error && <div className="error-box">{error}</div>}

      {/* Header */}
      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome back! Manage your coworking platform effectively.</p>
        </div>

        <div className="header-actions">
          <button
            className="notification-btn"
            onClick={() => setActiveView("notifications")}
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </button>

          <button className="reject" onClick={handleLogout} title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        {["dashboard", "spaces", "enquiries", "users", "notifications"].map(v => (
          <button
            key={v}
            className={`tab ${activeView === v ? "active" : ""}`}
            onClick={() => {
              setActiveView(v);
              setSearchTerm("");
              setFilterStatus("all");
            }}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Loader */}
      {loading && (
        <div className="loader-box">
          <Loader className="spin" size={40} color="#2563eb" />
          <p>Loading data...</p>
        </div>
      )}

      {/* Dashboard View */}
      {activeView === "dashboard" && !loading && (
        <>
          <div className="stats-grid">
            <StatCard 
              icon={Building2} 
              title="Total Spaces" 
              value={stats.totalSpaces}
              color="#667eea"
            />
            <StatCard 
              icon={Clock} 
              title="Pending Spaces" 
              value={stats.pendingSpaces}
              color="#f59e0b"
            />
            <StatCard 
              icon={Mail} 
              title="Pending Enquiries" 
              value={stats.pendingEnquiries}
              color="#ef4444"
            />
            <StatCard 
              icon={Users} 
              title="Total Users" 
              value={stats.totalUsers}
              color="#10b981"
            />
          </div>

          {/* Quick Actions */}
          <div className="content-card">
            <h2>Quick Overview</h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              <QuickStat 
                label="Spaces Approval Rate"
                value={stats.totalSpaces > 0 ? 
                  Math.round(((stats.totalSpaces - stats.pendingSpaces) / stats.totalSpaces) * 100) : 0}
                suffix="%"
              />
              <QuickStat 
                label="Active Notifications"
                value={unreadCount}
                suffix=" unread"
              />
            </div>
          </div>
        </>
      )}

      {/* Spaces View */}
      {activeView === "spaces" && !loading && (
        <div className="content-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2>Manage Spaces</h2>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>
              {filteredSpaces.length} spaces found
            </span>
          </div>

          {/* Search and Filter */}
          <div className="search-filter-bar">
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
              <input
                type="text"
                placeholder="Search by name or email..."
                className="search-input"
                style={{ paddingLeft: '44px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {filteredSpaces.length === 0 ? (
            <div className="empty-state">
              <Building2 className="empty-state-icon" size={64} />
              <h3>No spaces found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredSpaces.map(s => (
              <div key={s.id} className="list-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <h3>{s.name}</h3>
                    <p><Mail size={14} /> {s.email}</p>
                    <p><Users size={14} /> {s.phone}</p>
                    <span className={`space-status ${s.status}`}>
                      {s.status.toUpperCase()}
                    </span>
                  </div>
                  <button 
                    className="view-btn"
                    onClick={() => {
                      setSelectedItem(s);
                      setShowModal(true);
                    }}
                  >
                    <Eye size={16} />
                  </button>
                </div>

                {s.status === "pending" && (
                  <div className="action-row">
                    <button 
                      className="approve" 
                      onClick={() => updateSpaceStatus(s.id, "approved")}
                    >
                      <CheckCircle size={16} style={{ marginRight: '6px', display: 'inline' }} />
                      Approve
                    </button>
                    <button 
                      className="reject" 
                      onClick={() => updateSpaceStatus(s.id, "rejected")}
                    >
                      <XCircle size={16} style={{ marginRight: '6px', display: 'inline' }} />
                      Reject
                    </button>
                    <button 
                      className="view-btn" 
                      onClick={() => deleteSpace(s.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Enquiries View */}
      {activeView === "enquiries" && !loading && (
        <div className="content-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2>User Enquiries</h2>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>
              {filteredEnquiries.length} enquiries
            </span>
          </div>

          {/* Search and Filter */}
          <div className="search-filter-bar">
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
              <input
                type="text"
                placeholder="Search enquiries..."
                className="search-input"
                style={{ paddingLeft: '44px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="responded">Responded</option>
            </select>
          </div>

          {filteredEnquiries.length === 0 ? (
            <div className="empty-state">
              <Mail className="empty-state-icon" size={64} />
              <h3>No enquiries found</h3>
              <p>No customer enquiries at the moment</p>
            </div>
          ) : (
            filteredEnquiries.map(e => (
              <div key={e.id} className="list-card">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1 }}>
                    <h3>{e.name}</h3>
                    <p><Mail size={14} /> {e.email}</p>
                    <p><strong>Subject:</strong> {e.subject}</p>
                    <p style={{ marginTop: '8px', color: '#374151' }}>{e.message}</p>
                    <span className={`space-status ${e.status}`}>
                      {e.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="action-row">
                  {e.status === "pending" && (
                    <button 
                      className="approve" 
                      onClick={() => updateEnquiryStatus(e.id, "responded")}
                    >
                      Mark as Responded
                    </button>
                  )}
                  <button 
                    className="reject" 
                    onClick={() => deleteEnquiry(e.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Users View */}
      {activeView === "users" && !loading && (
        <div className="content-card">
          <h2>Platform Users</h2>
          {users.length === 0 ? (
            <div className="empty-state">
              <Users className="empty-state-icon" size={64} />
              <h3>No users found</h3>
            </div>
          ) : (
            users.map(u => (
              <div key={u.id} className="list-card">
                <h3>{u.name}</h3>
                <p><Mail size={14} /> {u.email}</p>
                <p><Users size={14} /> {u.mobile}</p>
                <p><strong>Role:</strong> {u.role}</p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Notifications View */}
      {activeView === "notifications" && !loading && (
        <div className="content-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2>Notifications</h2>
            {unreadCount > 0 && (
              <button className="approve" onClick={markAllNotificationsRead}>
                Mark All as Read
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="empty-state">
              <Bell className="empty-state-icon" size={64} />
              <h3>No notifications</h3>
              <p>You're all caught up!</p>
            </div>
          ) : (
            notifications.map(n => (
              <div 
                key={n.id} 
                className={`notif ${n.read ? "" : "unread"}`}
                onClick={() => !n.read && markNotificationRead(n.id)}
                style={{ cursor: n.read ? 'default' : 'pointer' }}
              >
                <div className="notif-header">
                  <div className="notif-message">{n.message}</div>
                  <div className="notif-time">{n.time}</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Detail Modal */}
      {showModal && selectedItem && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Space Details</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </div>
            <div>
              <p><strong>Name:</strong> {selectedItem.name}</p>
              <p><strong>Email:</strong> {selectedItem.email}</p>
              <p><strong>Phone:</strong> {selectedItem.phone}</p>
              <p><strong>Status:</strong> <span className={`space-status ${selectedItem.status}`}>{selectedItem.status}</span></p>
              <p><strong>Registration Date:</strong> {new Date(selectedItem.registrationDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* ---------------- STAT CARD ---------------- */
const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className="stat-card">
    <div className="stat-card-content">
      <p>{title}</p>
      <h3>{value}</h3>
    </div>
    <div className="stat-card-icon" style={{ background: color }}>
      <Icon size={24} />
    </div>
  </div>
);

/* ---------------- QUICK STAT ---------------- */
const QuickStat = ({ label, value, suffix = "" }) => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #f3f4f6'
  }}>
    <span style={{ color: '#6b7280', fontSize: '14px' }}>{label}</span>
    <span style={{ fontWeight: '600', color: '#1a1a1a' }}>
      {value}{suffix}
    </span>
  </div>
);

export default AdminDashboard;