import { BrowserRouter, Routes, Route } from "react-router-dom";
/* -------- ADMIN IMPORTS -------- */
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ManageSpaces from "./admin/pages/ManageSpaces";
import ManageBookings from "./admin/pages/ManageBookings";
import ManageUsers from "./admin/pages/ManageUsers";
import ServiceRequests from "./admin/pages/ServiceRequests";
import Authentication from "./jjjjj/authentication.jsx";

/* -------- USER IMPORTS -------- */
import UserLayout from "./user/UserLayout";
import Dashboard from "./user/pages/Dashboard";
import Spaces from "./user/pages/Spaces";
import SpaceDetails from "./user/pages/SpaceDetails";
import Booking from "./user/pages/Booking";
import Payment from "./user/pages/Payment";
import BookingHistory from "./user/pages/BookingHistory";
import CheckIn from "./user/pages/CheckIn";
import Support from "./user/pages/Support";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/" element={<AdminLayout />}>
        <Route path="/login" element={<Authentication />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="spaces" element={<ManageSpaces />} />
          <Route path="bookings" element={<ManageBookings />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="services" element={<ServiceRequests />} />
        </Route>

        {/* ================= USER ROUTES (OPEN) ================= */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="spaces" element={<Spaces />} />
          <Route path="spaces/:id" element={<SpaceDetails />} />
          <Route path="booking" element={<Booking />} />
          <Route path="payment" element={<Payment />} />
          <Route path="history" element={<BookingHistory />} />
          <Route path="checkin" element={<CheckIn />} />
          <Route path="support" element={<Support />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;


