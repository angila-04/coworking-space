import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AddSpace.css";

const AddSpace = () => {
  const { spaceId } = useParams(); // For edit mode
  const navigate = useNavigate();
  const isEditMode = !!spaceId;

  // Form state
  const [spaceName, setSpaceName] = useState("");
  const [location, setLocation] = useState("");
  const [spaceType, setSpaceType] = useState("Private Office");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [hourlyRate, setHourlyRate] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [weeklyRate, setWeeklyRate] = useState("");
  const [availability, setAvailability] = useState({
    start: "",
    end: "",
    days: []
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const amenityOptions = [
    "Wi-Fi",
    "Projector",
    "Whiteboard",
    "Air Conditioning",
    "Coffee/Pantry",
    "Parking",
    "24/7 Access"
  ];

  const daysOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Fetch space data if editing
  useEffect(() => {
    if (isEditMode) {
      fetchSpaceData();
    }
  }, [spaceId,isEditMode]);

  const fetchSpaceData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/spaces/${spaceId}`);
      const data = await response.json();
      
      setSpaceName(data.name || "");
      setLocation(data.location || "");
      setSpaceType(data.space_type || "Private Office");
      setCapacity(data.capacity || "");
      setDescription(data.description || "");
      setAmenities(data.amenities || []);
      setHourlyRate(data.hourly_rate || "");
      setDailyRate(data.daily_rate || "");
      setWeeklyRate(data.weekly_rate || "");
      setAvailability({
        start: data.available_start || "",
        end: data.available_end || "",
        days: data.available_days || []
      });
    } catch (error) {
      console.error("Error fetching space data:", error);
      alert("Failed to load space data");
    }
  };

  // Handle amenities
  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setAmenities((prev) =>
      checked ? [...prev, value] : prev.filter((a) => a !== value)
    );
  };

  // Handle availability days
  const handleDaysChange = (e) => {
    const { value, checked } = e.target;
    setAvailability((prev) => ({
      ...prev,
      days: checked
        ? [...prev.days, value]
        : prev.days.filter((d) => d !== value)
    }));
  };

  // Handle multiple image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  // Submit form (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditMode
        ? `http://127.0.0.1:8000/spaces/${spaceId}`
        : "http://127.0.0.1:8000/service-provider/spaces";

      const method = isEditMode ? "PUT" : "POST";

      // 1️⃣ Create or update space
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: spaceName,
          location,
          space_type: spaceType,
          capacity: Number(capacity),
          description,
          amenities,
          hourly_rate: hourlyRate ? Number(hourlyRate) : null,
          daily_rate: dailyRate ? Number(dailyRate) : null,
          weekly_rate: weeklyRate ? Number(weeklyRate) : null,
          available_start: availability.start,
          available_end: availability.end,
          available_days: availability.days
        })
      });

      if (!response.ok) {
        throw new Error(isEditMode ? "Failed to update space" : "Failed to add space");
      }

      const data = await response.json();
      const currentSpaceId = isEditMode ? spaceId : data.space_id;

      // 2️⃣ Upload images if any
      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((img) => {
          formData.append("images", img);
        });

        await fetch(
          `http://127.0.0.1:8000/spaces/${currentSpaceId}/images`,
          {
            method: "POST",
            body: formData
          }
        );
      }

      alert(isEditMode ? "Space updated successfully ✅" : "Space added successfully ✅");

      // 3️⃣ Reset form or navigate
      if (!isEditMode) {
        resetForm();
      } else {
        navigate("/service-provider/my-spaces");
      }

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete space
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this space? This action cannot be undone.")) return;

    setLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/spaces/${spaceId}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to delete space");

      alert("Space deleted successfully ✅");
      navigate("/service-provider/my-spaces");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setSpaceName("");
    setLocation("");
    setSpaceType("Private Office");
    setCapacity("");
    setDescription("");
    setAmenities([]);
    setHourlyRate("");
    setDailyRate("");
    setWeeklyRate("");
    setAvailability({ start: "", end: "", days: [] });
    setImages([]);
  };

  return (
    <div className="add-space-container">
      {/* Header */}
      <div className="space-header">
        <div>
          <h1 className="space-title">
            {isEditMode ? "Edit Space" : "Add New Space"}
          </h1>
          <p className="space-subtitle">
            {isEditMode 
              ? "Update your space information" 
              : "Fill in the details to list your coworking space"}
          </p>
        </div>
        {isEditMode && (
          <button 
            className="delete-space-btn" 
            onClick={handleDelete}
            disabled={loading}
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
            Delete Space
          </button>
        )}
      </div>

      <form className="add-space-form" onSubmit={handleSubmit}>
        {/* Basic Information Section */}
        <div className="form-section">
          <h3 className="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
              <polyline points="13 2 13 9 20 9"/>
            </svg>
            Basic Information
          </h3>

          <div className="form-row">
            <div className="form-field">
              <label>Space Name *</label>
              <input
                type="text"
                value={spaceName}
                onChange={(e) => setSpaceName(e.target.value)}
                placeholder="e.g., Premium Executive Suite"
                required
              />
            </div>

            <div className="form-field">
              <label>Location *</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Downtown Business District"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Space Type *</label>
              <select value={spaceType} onChange={(e) => setSpaceType(e.target.value)}>
                <option>Private Office</option>
                <option>Meeting Room</option>
                <option>Open Desk</option>
                <option>Event Hall</option>
              </select>
            </div>

            <div className="form-field">
              <label>Capacity *</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="Number of people"
                min="1"
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your space, its features, and what makes it special..."
              rows="4"
            />
          </div>
        </div>

        {/* Amenities Section */}
        <div className="form-section">
          <h3 className="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Amenities
          </h3>
          <div className="amenities-grid">
            {amenityOptions.map((a) => (
              <label key={a} className="amenity-checkbox">
                <input
                  type="checkbox"
                  value={a}
                  checked={amenities.includes(a)}
                  onChange={handleAmenityChange}
                />
                <span>{a}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="form-section">
          <h3 className="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            Pricing (₹)
          </h3>
          <div className="pricing-row">
            <div className="form-field">
              <label>Hourly Rate</label>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                placeholder="Hourly"
                min="0"
              />
            </div>
            <div className="form-field">
              <label>Daily Rate</label>
              <input
                type="number"
                value={dailyRate}
                onChange={(e) => setDailyRate(e.target.value)}
                placeholder="Daily"
                min="0"
              />
            </div>
            <div className="form-field">
              <label>Weekly Rate</label>
              <input
                type="number"
                value={weeklyRate}
                onChange={(e) => setWeeklyRate(e.target.value)}
                placeholder="Weekly"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Availability Section */}
        <div className="form-section">
          <h3 className="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            Availability
          </h3>
          
          <div className="form-row">
            <div className="form-field">
              <label>Start Time</label>
              <input
                type="time"
                value={availability.start}
                onChange={(e) =>
                  setAvailability({ ...availability, start: e.target.value })
                }
              />
            </div>
            <div className="form-field">
              <label>End Time</label>
              <input
                type="time"
                value={availability.end}
                onChange={(e) =>
                  setAvailability({ ...availability, end: e.target.value })
                }
              />
            </div>
          </div>

          <div className="days-section">
            <label className="days-label">Available Days</label>
            <div className="days-group">
              {daysOptions.map((d) => (
                <label key={d} className="day-chip">
                  <input
                    type="checkbox"
                    value={d}
                    checked={availability.days.includes(d)}
                    onChange={handleDaysChange}
                  />
                  <span>{d}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div className="form-section">
          <h3 className="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            Images
          </h3>

          <div className="upload-area">
            <label className="upload-label">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <span className="upload-text">
                {isEditMode ? "Upload Additional Images" : "Click to upload images"}
              </span>
              <span className="upload-hint">Multiple images allowed (JPG, PNG, GIF)</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </label>
          </div>

          {images.length > 0 && (
            <div className="images-list">
              <p className="images-label">Selected Images:</p>
              <ul>
                {images.map((img, i) => (
                  <li key={i}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                      <polyline points="13 2 13 9 20 9"/>
                    </svg>
                    {img.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => isEditMode ? navigate("/service-provider/my-spaces") : resetForm()}
          >
            {isEditMode ? "Cancel" : "Reset Form"}
          </button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <span className="loading-text">
                <span className="spinner"></span>
                {isEditMode ? "Updating..." : "Adding..."}
              </span>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {isEditMode ? "Update Space" : "Add Space"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSpace;