import { useState } from "react";
import "../admin.css";


function ManageUsers() {
  // Dummy users
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", status: "active" },
    { id: 2, name: "Sara Smith", status: "blocked" },
    { id: 3, name: "Mike Lee", status: "active" }
  ]);

  // Toggle user status
  const toggleStatus = (id) => {
    setUsers(users.map(user => 
      user.id === id
        ? { ...user, status: user.status === "active" ? "blocked" : "active" }
        : user
    ));
  };

  return (
    <div>
      <h1>Manage Users</h1>
      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => toggleStatus(user.id)}>
                  {user.status === "active" ? "Block" : "Approve"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;
