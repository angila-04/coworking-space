import "./ActivityLogs.css";

const ActivityLogs = () => {
  // Dummy activity data (frontend only)
  const activities = [
    {
      id: 1,
      date: "08 Jan 2026",
      type: "Space",
      description: 'Added new space "Meeting Room A"',
      status: "Success"
    },
    {
      id: 2,
      date: "07 Jan 2026",
      type: "Booking",
      description: "Booking confirmed for Private Office",
      status: "Success"
    },
    {
      id: 3,
      date: "06 Jan 2026",
      type: "Payment",
      description: "₹2000 payment received",
      status: "Success"
    },
    {
      id: 4,
      date: "05 Jan 2026",
      type: "Task",
      description: "Cleaning task marked as completed",
      status: "Completed"
    },
    {
      id: 5,
      date: "04 Jan 2026",
      type: "Profile",
      description: "Profile details updated",
      status: "Success"
    }
  ];

  return (
    <div className="activity-log-container">
      <h1>Activity Logs</h1>

      <table className="activity-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td>{activity.date}</td>
              <td>{activity.type}</td>
              <td>{activity.description}</td>
              <td className={`status ${activity.status.toLowerCase()}`}>
                {activity.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityLogs;
