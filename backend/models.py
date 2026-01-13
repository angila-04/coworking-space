from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String)

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String, index=True)   # who booked
    space_name = Column(String)              # which space
    date = Column(String)                    # booking date
    time = Column(String)                    # booking time
    status = Column(String, default="Pending")  # Pending / Approved / Rejected
    created_at = Column(DateTime, default=datetime.utcnow)  