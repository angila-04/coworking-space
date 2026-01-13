import { useState } from "react";
import "../admin.css";


function ManageSpaces() {
  const [spaces, setSpaces] = useState([
    { id: 1, name: "Downtown Hub", status: "pending" },
    { id: 2, name: "Tech Park Space", status: "approved" },
    { id: 3, name: "Startup Bay", status: "pending" }
  ]);

  const updateStatus = (id, newStatus) => {
    setSpaces(
      spaces.map(space =>
        space.id === id ? { ...space, status: newStatus } : space
      )
    );
  };

  return (
    <div>
      <h1>Manage Spaces</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Space Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {spaces.map(space => (
            <tr key={space.id}>
              <td>{space.id}</td>
              <td>{space.name}</td>
              <td>{space.status}</td>
              <td>
                <button onClick={() => updateStatus(space.id, "approved")}>
                  Approve
                </button>{" "}
                <button onClick={() => updateStatus(space.id, "rejected")}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageSpaces;
