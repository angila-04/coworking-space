import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ManageSpaces from "./admin/pages/ManageSpaces";
import ManageBookings from "./admin/pages/ManageBookings";
import ManageUsers from "./admin/pages/ManageUsers";
import ServiceRequests from "./admin/pages/ServiceRequests";

import Authentication from "./jjjjj/authentication.jsx";

/* Service Provider imports */
import ServiceProviderLayout from "./layouts/ServiceProviderLayout";
import Dashboard from "./pages/serviceProvider/Dashboard";
import MySpaces from "./pages/serviceProvider/MySpaces";
import AddSpace from "./pages/serviceProvider/AddSpace";
import PaymentsBilling from "./pages/serviceProvider/Payments";
import ReportsAnalytics from "./pages/serviceProvider/ReportsAnalytics";
import ActivityLogs from "./pages/serviceProvider/ActivityLogs";
import AssignedTasks from "./pages/serviceProvider/AssignedTasks";
import TaskDetails from "./pages/serviceProvider/TaskDetails";
import Notifications from "./pages/serviceProvider/Notifications";
import Bookings from "./pages/serviceProvider/Bookings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔐 AUTH */}
        <Route path="/login" element={<Authentication />} />

        {/* 🛠 ADMIN MODULE */}
        <Route path="/" element={<AdminLayout />} />
          <Route index element={<Navigate to="dashboard" />} />
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Route */}
        <Route path="/login" element={<Authentication />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="spaces" element={<ManageSpaces />} />
          <Route path="bookings" element={<ManageBookings />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="services" element={<ServiceRequests />} />
        </Route>

        {/* 👷 SERVICE PROVIDER MODULE */}
        <Route path="/service-provider" element={<ServiceProviderLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-spaces" element={<MySpaces />} />         
          <Route path="add-space" element={<AddSpace />} />
          <Route path="tasks" element={<AssignedTasks />} />
          <Route path="tasks/:id" element={<TaskDetails />} />
          <Route path="payments" element={<PaymentsBilling />} />
          <Route path="reports" element={<ReportsAnalytics />} />
          <Route path="activity-logs" element={<ActivityLogs />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="bookings" element={<Bookings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
