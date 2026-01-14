import { Outlet } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";

import UserNavbar from "./components/UserNavbar";
import OfferTicker from "./components/OfferTicker";

import "./user.css";

function UserLayout() {
  return (
    <BookingProvider>
      {/* 🔥 AWFIS-style Offer Ribbon */}
      <OfferTicker />

      {/* 🧭 Main User Navigation */}
      <UserNavbar />

      {/* 📦 Page Content */}
      <main className="user-layout">
        <Outlet />
      </main>
    </BookingProvider>
  );
}

export default UserLayout;
