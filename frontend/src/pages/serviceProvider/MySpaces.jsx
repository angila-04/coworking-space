import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MySpaces.css";

const MySpaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all spaces
  useEffect(() => {
    fetch("http://127.0.0.1:8000/spaces/")
      .then((res) => res.json())
      .then((data) => {
        setSpaces(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching spaces:", err);
        setLoading(false);
      });
  }, []);

  // Delete space
  const deleteSpace = (id) => {
    if (!window.confirm("Are you sure you want to delete this space?")) return;

    fetch(`http://127.0.0.1:8000/spaces/${id}/`, {
      method: "DELETE",
    }).then(() => {
      setSpaces((prev) => prev.filter((space) => space.id !== id));
    });
  };

  // Toggle availability
  const toggleAvailability = (id, currentStatus) => {
    fetch(`http://127.0.0.1:8000/spaces/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_available: !currentStatus }),
    }).then(() => {
      setSpaces((prev) =>
        prev.map((space) =>
          space.id === id
            ? { ...space, is_available: !currentStatus }
            : space
        )
      );
    });
  };

  return (
    <div className="myspaces-container">
      <div className="myspaces-header">
        <h2>My Spaces</h2>

        <Link to="/service-provider/add-space">
          <button className="add-space-btn">+ Add Space</button>
        </Link>
      </div>

      {loading && <p>Loading spaces...</p>}

      {!loading && spaces.length === 0 && (
        <p>No spaces added yet.</p>
      )}

      {!loading &&
        spaces.map((space) => (
          <div key={space.id} className="space-card">
            <div className="space-title">{space.name}</div>

            <p className="space-info">📍 {space.location}</p>
            <p className="space-info">💰 ₹{space.price}</p>

            <p className="space-info">
              Status:{" "}
              <span
                className={
                  space.is_available
                    ? "status-available"
                    : "status-unavailable"
                }
              >
                {space.is_available ? "Available" : "Unavailable"}
              </span>
            </p>

            <div className="space-actions">
              <button
                className="btn btn-toggle"
                onClick={() =>
                  toggleAvailability(space.id, space.is_available)
                }
              >
                Toggle Availability
              </button>

              <Link to={`/service-provider/edit-space/${space.id}`}>
                <button className="btn btn-edit">Edit</button>
              </Link>

              <button
                className="btn btn-delete"
                onClick={() => deleteSpace(space.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MySpaces;
