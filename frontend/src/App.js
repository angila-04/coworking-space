import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* ================= ADMIN ================= */
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";

/* ================= AUTH ================= */
import Authentication from "./jjjjj/authentication";

/* ================= SERVICE PROVIDER ================= */
import ServiceProviderLayout from "./layouts/ServiceProviderLayout";
import Dashboard from "./pages/serviceProvider/Dashboard";
import MySpaces from "./pages/serviceProvider/MySpaces";
import AddSpace from "./pages/serviceProvider/AddSpace";
import PaymentsBilling from "./pages/serviceProvider/Payments";
import ActivityLogs from "./pages/serviceProvider/ActivityLogs";
import ServiceProviderNotifications from "./pages/serviceProvider/Notifications";
import Bookings from "./pages/serviceProvider/Bookings";
import Profile from "./pages/serviceProvider/Profile";

/* ================= USER ================= */
// import UserLayout from "./layouts/UserLayout";
// import UserDashboard from "./pages/user/Dashboard";
// import UserBookings from "./pages/user/Bookings";
// import UserPayments from "./pages/user/Payments";
// import UserProfile from "./pages/user/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌍 DEFAULT */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 🔐 AUTH */}
        <Route path="/login" element={<Authentication />} />

        {/* 🛠 ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

        {/* 👷 SERVICE PROVIDER */}
        <Route
          path="/service-provider/:providerId"
          element={<ServiceProviderLayout />}
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-spaces" element={<MySpaces />} />
          <Route path="add-space" element={<AddSpace />} />
          <Route path="edit-space/:spaceId" element={<AddSpace />} />
          <Route path="payments" element={<PaymentsBilling />} />
          <Route path="activity-logs" element={<ActivityLogs />} />
          <Route path="notifications" element={<ServiceProviderNotifications />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* 👤 USER */}
        {/* <Route path="/user/:userId" element={<UserLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="bookings" element={<UserBookings />} />
          <Route path="payments" element={<UserPayments />} />
          <Route path="profile" element={<UserProfile />} /> */}
        {/* </Route> */}

        {/* ❌ FALLBACK */}
        <Route path="*" element={<h2>Page Not Found</h2>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
