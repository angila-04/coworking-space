import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);

  const addBooking = (booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  const totalBookings = bookings.length;
  const totalSeats = bookings.reduce((sum, b) => sum + b.seats, 0);
  const totalSpent = bookings.reduce((sum, b) => sum + b.amount, 0);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        totalBookings,
        totalSeats,
        totalSpent
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
