import { useEffect, useState } from "react";

export default function ActivityLog() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/activity-logs")
      .then((res) => res.json())
      .then((data) => setLogs(data));
  }, []);

  return (
    <div>
      <h2>Activity Log</h2>

      {logs.length === 0 && <p>No activity yet</p>}

      {logs.map((log) => (
        <div
          key={log.id}
          style={{
            borderBottom: "1px solid #ddd",
            padding: "10px 0",
          }}
        >
          <p><b>{log.message}</b></p>
          <small>{log.timestamp}</small>
        </div>
      ))}
    </div>
  );
}
