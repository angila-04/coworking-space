// import { useEffect, useState } from "react";
// import "./Bookings.css";

// const Bookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/bookings")
//       .then((res) => res.json())
//       .then((data) => {
//         setBookings(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching bookings:", err);
//         setLoading(false);
//       });
//   }, []);

//   const updateStatus = async (id, status) => {
//     try {
//       await fetch(`http://127.0.0.1:8000/bookings/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status }),
//       });

//       setBookings((prev) =>
//         prev.map((b) =>
//           b.id === id ? { ...b, status } : b
//         )
//       );
//     } catch (error) {
//       console.error("Failed to update status:", error);
//     }
//   };

//   if (loading) return <p>Loading bookings...</p>;

//   return (
//     <div className="bookings-container">
//       <h2>Service Provider – Bookings</h2>

//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>User</th>
//             <th>Space</th>
//             <th>Date</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {bookings.length === 0 ? (
//             <tr>
//               <td colSpan="6">No bookings found</td>
//             </tr>
//           ) : (
//             bookings.map((booking) => (
//               <tr key={booking.id}>
//                 <td>{booking.id}</td>
//                 <td>{booking.user_id}</td>
//                 <td>{booking.space_id}</td>
//                 <td>{booking.date}</td>
//                 <td>{booking.status}</td>
//                 <td>
//                   <select
//                     value={booking.status}
//                     onChange={(e) =>
//                       updateStatus(booking.id, e.target.value)
//                     }
//                   >
//                     <option value="pending">Pending</option>
//                     <option value="approved">Approved</option>
//                     <option value="rejected">Rejected</option>
//                   </select>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Bookings;



import { useState } from "react";

export default function Bookings() {
  const [view, setView] = useState("list"); // list | details | calendar
  const [selectedBooking, setSelectedBooking] = useState(null);

  const bookings = [
    {
      id: 1,
      customer: "Rahul",
      service: "Meeting Room",
      date: "2026-01-20",
      time: "10:00 AM",
      status: "Upcoming",
    },
    {
      id: 2,
      customer: "Anita",
      service: "Private Office",
      date: "2026-01-18",
      time: "2:00 PM",
      status: "Completed",
    },
  ];

  // ---------- LIST VIEW ----------
  const BookingList = () => (
    <>
      <h2>My Bookings</h2>
      <button onClick={() => setView("calendar")}>Calendar View</button>

      {bookings.map((b) => (
        <div
          key={b.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <p><b>{b.service}</b></p>
          <p>Customer: {b.customer}</p>
          <p>{b.date} | {b.time}</p>
          <p>Status: {b.status}</p>

          <button onClick={() => {
            setSelectedBooking(b);
            setView("details");
          }}>
            View Details
          </button>
        </div>
      ))}
    </>
  );

  // ---------- DETAILS VIEW ----------
  const BookingDetails = () => (
    <>
      <h2>Booking Details</h2>

      <p><b>Service:</b> {selectedBooking.service}</p>
      <p><b>Customer:</b> {selectedBooking.customer}</p>
      <p><b>Date:</b> {selectedBooking.date}</p>
      <p><b>Time:</b> {selectedBooking.time}</p>
      <p><b>Status:</b> {selectedBooking.status}</p>

      <button>Accept</button>
      <button>Reject</button>
      <button>Mark Completed</button>
      <br /><br />
      <button onClick={() => setView("list")}>Back</button>
    </>
  );

  // ---------- CALENDAR VIEW ----------
  const BookingCalendar = () => (
    <>
      <h2>Booking Calendar</h2>

      {bookings.map((b) => (
        <div key={b.id}>
          📅 {b.date} — {b.service}
        </div>
      ))}

      <br />
      <button onClick={() => setView("list")}>Back to List</button>
    </>
  );

  return (
    <div>
      {view === "list" && <BookingList />}
      {view === "details" && selectedBooking && <BookingDetails />}
      {view === "calendar" && <BookingCalendar />}
    </div>
  );
}

