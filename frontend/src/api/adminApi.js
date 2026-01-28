import API from "./authApi";

// ---------- DASHBOARD ----------
export const getAdminDashboard = () =>
  API.get("/admin/dashboard");

// ---------- SPACES ----------
export const getAllSpaces = () =>
  API.get("/admin/spaces");

export const updateSpaceStatus = (spaceId, status) =>
  API.put(`/admin/spaces/${spaceId}/status`, null, {
    params: { status },
  });

// ---------- ENQUIRIES ----------
export const getAllEnquiries = () =>
  API.get("/admin/enquiries");

export const respondToEnquiry = (enquiryId) =>
  API.put(`/admin/enquiries/${enquiryId}/respond`);

// ---------- NOTIFICATIONS ----------
export const getAdminNotifications = () =>
  API.get("/admin/notifications");
