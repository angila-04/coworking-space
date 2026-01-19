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
  const [availability, setAvailability] = useState({
    start: "",
    end: "",
    days: []
  });
  const [images, setImages] = useState([]);

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

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Create space
      const response = await fetch(
        "http://127.0.0.1:8000/service-provider/spaces",
        {
          method: "POST",
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
            availability_start: availability.start,
            availability_end: availability.end,
            availability_days: availability.days
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add space");
      }

      const data = await response.json();
      const spaceId = data.space_id;

      // 2️⃣ Upload multiple images
      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((img) => {
          formData.append("images", img);
        });

        await fetch(
          `http://127.0.0.1:8000/service-provider/spaces/${spaceId}/images`,
          {
            method: "POST",
            body: formData
          }
        );
      }

      alert("Space added successfully ✅");

      // 3️⃣ Reset form
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

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="add-space-container">
      <h1>Add Your Space</h1>

      <form className="add-space-form" onSubmit={handleSubmit}>
        <div>
          <label>Space Name:</label>
          <input
            type="text"
            value={spaceName}
            onChange={(e) => setSpaceName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Space Type:</label>
          <select
            value={spaceType}
            onChange={(e) => setSpaceType(e.target.value)}
          >
            <option>Private Office</option>
            <option>Meeting Room</option>
            <option>Open Desk</option>
            <option>Event Hall</option>
          </select>
        </div>

        <div>
          <label>Capacity:</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>Amenities:</label>
          {amenityOptions.map((a) => (
            <label key={a}>
              <input
                type="checkbox"
                value={a}
                checked={amenities.includes(a)}
                onChange={handleAmenityChange}
              />
              {a}
            </label>
          ))}
        </div>

        <div>
          <label>Pricing:</label>
          <input
            type="number"
            placeholder="Hourly"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
          />
          <input
            type="number"
            placeholder="Daily"
            value={dailyRate}
            onChange={(e) => setDailyRate(e.target.value)}
          />
          <input
            type="number"
            placeholder="Weekly"
            value={weeklyRate}
            onChange={(e) => setWeeklyRate(e.target.value)}
          />
        </div>

        <div>
          <label>Availability:</label>
          Start:
          <input
            type="time"
            value={availability.start}
            onChange={(e) =>
              setAvailability({ ...availability, start: e.target.value })
            }
          />
          End:
          <input
            type="time"
            value={availability.end}
            onChange={(e) =>
              setAvailability({ ...availability, end: e.target.value })
            }
          />
          <div className="days-group">
            {daysOptions.map((d) => (
              <label key={d}>
                <input
                  type="checkbox"
                  value={d}
                  checked={availability.days.includes(d)}
                  onChange={handleDaysChange}
                />
                {d}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label>Images:</label>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} />
          {images.length > 0 && (
            <ul>
              {images.map((img, i) => (
                <li key={i}>{img.name}</li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Add Space
        </button>
      </form>
    </div>
  );
};

export default AddSpace;
