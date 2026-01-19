from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime,Text
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

# -------------------- USER --------------------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=True)      # ✅ ADD
    email = Column(String, unique=True, index=True)
    mobile = Column(String, nullable=True)
    password = Column(String)
    role = Column(String)

# -------------------- BOOKING --------------------
class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String, index=True)   # who booked
    space_name = Column(String)              # which space
    date = Column(String)                    # booking date
    time = Column(String)                    # booking time
    status = Column(String, default="Pending")  # Pending / Approved / Rejected
    created_at = Column(DateTime, default=datetime.utcnow)  

# -------------------- SPACE --------------------
class Space(Base):
    __tablename__ = "spaces"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    mobile = Column(String, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False)

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    space_id = Column(Integer, ForeignKey("spaces.id"), nullable=False)
    booking_time = Column(DateTime(timezone=True), server_default=func.now())
    amount = Column(Float, nullable=False)