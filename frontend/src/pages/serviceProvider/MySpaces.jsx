import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./MySpaces.css";

const MySpaces = () => {
  const { providerId } = useParams();   
  console.log("Provider ID from URL:", providerId); // Add this debug line
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, available, unavailable

  // Fetch all spaces
  useEffect(() => {
  const fetchSpaces = async () => {
    if (!providerId) {
      console.error("Provider ID is missing");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/spaces/provider/${providerId}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Fetched spaces data:", data); // Debug log
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setSpaces(data);
      } else {
        console.error("Expected array but got:", typeof data, data);
        setSpaces([]);
      }
    } catch (error) {
      console.error("Error fetching spaces:", error);
      setSpaces([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  fetchSpaces();
}, [providerId]);
     

  // Delete space
  const deleteSpace = async(id) => {
    if (!window.confirm("Are you sure you want to delete this space?")) return;

    fetch(`http://127.0.0.1:8000/spaces/${id}`, {
      method: "DELETE",
    }).then(() => {
      setSpaces((prev) => prev.filter((space) => space.id !== id));
    });
  };

  // Toggle availability
  const toggleAvailability = async (id, currentStatus) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/spaces/${id}/availability`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_available: !currentStatus }),
      }
    );
    
    if (response.ok) {
      setSpaces((prev) =>
        prev.map((space) =>
          space.id === id ? { ...space, is_available: !currentStatus } : space
        )
      );
    }
  } catch (error) {
    console.error("Toggle error:", error);
  }
};

  // Filter spaces
  const filteredSpaces = spaces.filter((space) => {
    if (filter === "available") return space.is_available;
    if (filter === "unavailable") return !space.is_available;
    return true;
  });

  const availableCount = spaces.filter((s) => s.is_available).length;
  const unavailableCount = spaces.filter((s) => !s.is_available).length;

  return (
    <div className="myspaces-container">
      {/* Header Section */}
      <div className="myspaces-header">
        <div className="header-content">
          <h2 className="page-title">My Spaces</h2>
          <p className="page-subtitle">
            Manage and monitor all your coworking spaces
          </p>
        </div>

          <Link to={`/service-provider/${providerId}/add-space`} className="link-unstyled">
          <button className="add-space-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Add New Space
          </button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="stats-row">
        <div className="stat-box">
          <div className="stat-icon blue-bg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Spaces</p>
            <p className="stat-number">{spaces.length}</p>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon green-bg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Available</p>
            <p className="stat-number">{availableCount}</p>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon orange-bg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Unavailable</p>
            <p className="stat-number">{unavailableCount}</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button
          className={`filter-tab ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All Spaces ({spaces.length})
        </button>
        <button
          className={`filter-tab ${filter === "available" ? "active" : ""}`}
          onClick={() => setFilter("available")}
        >
          Available ({availableCount})
        </button>
        <button
          className={`filter-tab ${filter === "unavailable" ? "active" : ""}`}
          onClick={() => setFilter("unavailable")}
        >
          Unavailable ({unavailableCount})
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading your spaces...</p>
        </div>  
      )}

      {/* Empty State */}
      {!loading && spaces.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
              <rect x="2" y="7" width="20" height="14" rx="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
          </div>
          <h3>No Spaces Yet</h3>
          <p>Start by adding your first coworking space</p>
          <Link to={`/service-provider/${providerId}/add-space`} className="link-unstyled">
            <button className="add-space-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Add Your First Space
            </button>
          </Link>
        </div>
      )}

      {/* Spaces Grid */}
      {!loading && filteredSpaces.length > 0 && (
        <div className="spaces-grid">
          {filteredSpaces.map((space) => (
            <div key={space.id} className="space-card">
              {/* Image Gallery Section */}
              {space.images && space.images.length > 0 && (
                <div className="card-images">
                  <div className="main-image">
                    <img 
                      src={space.images[0]} 
                      alt={space.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x250?text=No+Image';
                      }}
                    />
                    <div className="image-count-badge">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                      {space.images.length} {space.images.length === 1 ? 'Photo' : 'Photos'}
                    </div>
                  </div>
                  
                  {space.images.length > 1 && (
                    <div className="thumbnail-strip">
                      {space.images.slice(1, 4).map((img, idx) => (
                        <div key={idx} className="thumbnail">
                          <img 
                            src={img} 
                            alt={`${space.name} ${idx + 2}`}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/100x80?text=No+Image';
                            }}
                          />
                          {idx === 2 && space.images.length > 4 && (
                            <div className="thumbnail-overlay">
                              +{space.images.length - 4}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* If no images, show placeholder */}
              {(!space.images || space.images.length === 0) && (
                <div className="card-images">
                  <div className="main-image no-image">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                    <p>No images</p>
                  </div>
                </div>
              )}

              {/* Card Header */}
              <div className="card-header">
                <div className="space-title-wrapper">
                  <h3 className="space-title">{space.name}</h3>
                  <span className={`status-badge ${space.is_available ? "available" : "unavailable"}`}>
                    <span className="status-dot"></span>
                    {space.is_available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="card-body">
                <div className="space-detail">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>{space.location}</span>
                </div>

                <div className="space-detail">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                  <span className="price-text">₹{space.price.toLocaleString('en-IN')}</span>
                </div>

                {space.description && (
                  <p className="space-description">{space.description}</p>
                )}
              </div>

              {/* Card Footer */}
              <div className="card-footer">
                <button
                  className="action-btn toggle-btn"
                  onClick={() => toggleAvailability(space.id, space.is_available)}
                  title={space.is_available ? "Mark as Unavailable" : "Mark as Available"}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {space.is_available ? (
                      <path d="M18 6L6 18M6 6l12 12"/>
                    ) : (
                      <polyline points="20 6 9 17 4 12"/>
                    )}
                  </svg>
                  {space.is_available ? "Disable" : "Enable"}
                </button>

                <Link to={`/service-provider/edit-space/${space.id}`} className="link-unstyled">
                  <button className="action-btn edit-btn" title="Edit Space">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Edit
                  </button>
                </Link>

                <button
                  className="action-btn delete-btn"
                  onClick={() => deleteSpace(space.id)}
                  title="Delete Space"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    <line x1="10" y1="11" x2="10" y2="17"/>
                    <line x1="14" y1="11" x2="14" y2="17"/>
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results State */}
      {!loading && spaces.length > 0 && filteredSpaces.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <h3>No Spaces Found</h3>
          <p>No spaces match the selected filter</p>
        </div>
      )}
    </div>
  );
};

export default MySpaces;