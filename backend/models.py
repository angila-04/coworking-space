from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Date, Time
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

# -------------------- USER --------------------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=True)
    email = Column(String, unique=True, index=True)
    mobile = Column(String, nullable=True)
    password = Column(String)
    role = Column(String)

    orders = relationship("Order", back_populates="user")


# -------------------- SPACE --------------------
class Space(Base):
    __tablename__ = "spaces"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    mobile = Column(String, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False)
    images = relationship("SpaceImage", back_populates="space")
   


# -------------------- SPACE IMAGE --------------------
class SpaceImage(Base):
    __tablename__ = "space_images"

    id = Column(Integer, primary_key=True, index=True)
    space_id = Column(Integer, ForeignKey("spaces.id"), nullable=False)
    image_url = Column(String, nullable=False)
    space = relationship("Space", back_populates="images")


# -------------------- BOOKING --------------------
class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    booking_code = Column(String, unique=True, index=True)

    user_id = Column(Integer, nullable=False)
    user_name = Column(String, nullable=False)

    provider_id = Column(Integer, nullable=False)
    space_id = Column(Integer, nullable=False)
    space_name = Column(String, nullable=False)

    booking_date = Column(Date, nullable=False)
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)

    total_amount = Column(Float, nullable=False)
    payment_status = Column(String, default="pending")
    booking_status = Column(String, default="pending")

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)



