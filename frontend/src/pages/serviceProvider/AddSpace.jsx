import { useState } from "react";
import "./AddSpace.css";


const AddSpace = () => {
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
  const [availability, setAvailability] = useState({ start: "", end: "", days: [] });
  const [images, setImages] = useState([]);

  // Local list of spaces
  const [spaces, setSpaces] = useState([]);

  const amenityOptions = ["Wi-Fi", "Projector", "Whiteboard", "Air Conditioning", "Coffee/Pantry", "Parking", "24/7 Access"];
  const daysOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Handle checkbox changes for amenities
  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) setAmenities([...amenities, value]);
    else setAmenities(amenities.filter(a => a !== value));
  };

  // Handle checkbox changes for availability days
  const handleDaysChange = (e) => {
    const { value, checked } = e.target;
    if (checked) setAvailability((prev) => ({ ...prev, days: [...prev.days, value] }));
    else setAvailability((prev) => ({ ...prev, days: prev.days.filter(d => d !== value) }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  setImages(files);
};


  // Handle form submission (frontend only)
  const handleSubmit = (e) => {
    e.preventDefault();

    const newSpace = {
      name: spaceName,
      location,
      type: spaceType,
      capacity,
      description,
      amenities,
      pricing: { hourly: hourlyRate, daily: dailyRate, weekly: weeklyRate },
      availability,
      images: images.map(img => img.name)
    };

    setSpaces([...spaces, newSpace]);

    // Reset form
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
      <h1>Add Your Space</h1>

      <form className="add-space-form" onSubmit={handleSubmit}>       
         <div>
          <label>Space Name:</label><br />
          <input type="text" value={spaceName} onChange={(e) => setSpaceName(e.target.value)} required />
        </div>

        <div>
          <label>Location:</label><br />
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>

        <div>
          <label>Space Type:</label><br />
          <select value={spaceType} onChange={(e) => setSpaceType(e.target.value)}>
            <option>Private Office</option>
            <option>Meeting Room</option>
            <option>Open Desk</option>
            <option>Event Hall</option>
          </select>
        </div>

        <div>
          <label>Capacity:</label><br />
          <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
        </div>

        <div>
          <label>Description:</label><br />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>

        <div>
          <label>Amenities:</label><br />
          {amenityOptions.map(a => (
            <label key={a} style={{ marginRight: "10px" }}>
              <input type="checkbox" value={a} checked={amenities.includes(a)} onChange={handleAmenityChange} /> {a}
            </label>
          ))}
        </div>

        <div>
          <label>Pricing:</label><br />
          <input type="number" placeholder="Hourly Rate" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} style={{ marginRight: "5px" }} />
          <input type="number" placeholder="Daily Rate" value={dailyRate} onChange={(e) => setDailyRate(e.target.value)} style={{ marginRight: "5px" }} />
          <input type="number" placeholder="Weekly Rate" value={weeklyRate} onChange={(e) => setWeeklyRate(e.target.value)} />
        </div>

        <div>
          <label>Availability:</label><br />
          Start: <input type="time" value={availability.start} onChange={(e) => setAvailability({ ...availability, start: e.target.value })} />
          End: <input type="time" value={availability.end} onChange={(e) => setAvailability({ ...availability, end: e.target.value })} /><br />
          <div className="days-group">
             {daysOptions.map(d => (
            <label key={d} className="day-item">
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

        <div>
  <label>Images:</label><br />

  <input
    type="file"
    multiple
    accept="image/*"
    onChange={handleImageChange}
  />

  {images.length > 0 && (
    <ul style={{ marginTop: "8px" }}>
      {images.map((img, index) => (
        <li key={index}>{img.name}</li>
      ))}
    </ul>
  )}
</div>


        <button type="submit" className="submit-btn">Add Space</button>
      </form>

      <h2>My Spaces</h2>
      {spaces.length === 0 ? <p>No spaces added yet.</p> : (
        <ul>
          {spaces.map((space, index) => (
            <li key={index}>
              {space.name} - {space.location} - {space.type} - Capacity: {space.capacity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddSpace;
