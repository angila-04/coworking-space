from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Date, Time, Text, Boolean
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime
from sqlalchemy.sql import func


# -------------------- USER --------------------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=True)
    email = Column(String, unique=True, index=True)
    mobile = Column(String, nullable=True)
    password = Column(String)
    role = Column(String)
    # orders = relationship("Booking", back_populates="user")

# -------------------- SPACE --------------------
class Space(Base):
    __tablename__ = "spaces"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    space_type = Column(String, nullable=False)
    capacity = Column(Integer, nullable=False)
    description = Column(String)
    amenities = Column(String)

    hourly_rate = Column(Float)
    daily_rate = Column(Float)
    weekly_rate = Column(Float)

    available_start = Column(Time)
    available_end = Column(Time)
    available_days = Column(String)

    is_available = Column(Boolean, default=True)  # ADD THIS LINE

    provider_id = Column(Integer,ForeignKey("users.id"), nullable=False)
    images = relationship("SpaceImage", back_populates="space")
    email = Column(String, unique=True, index=True, nullable=False)
    mobile = Column(String, nullable=False)

    status = Column(String, default="pending")  # pending | approved | rejected
    created_at = Column(DateTime, default=datetime.utcnow)
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

    user_id = Column(Integer,ForeignKey("users.id"), nullable=False)
    user_name = Column(String, nullable=False)

    provider_id = Column(Integer,ForeignKey("users.id"), nullable=False)
    space_id = Column(Integer,ForeignKey("spaces.id"), nullable=False)
    space_name = Column(String, nullable=False)

    booking_date = Column(Date, nullable=False)
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)

    total_amount = Column(Float, nullable=False)
    payment_status = Column(String, default="unpaid")
    booking_status = Column(String, default="pending")

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    # user = relationship("User", back_populates="orders")    

    user = relationship("User", foreign_keys=[user_id])
    provider = relationship("User", foreign_keys=[provider_id])
    space = relationship("Space")



class Enquiry(Base):
    __tablename__ = "enquiries"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    phone = Column(String)
    type = Column(String)  # user, service_provider
    subject = Column(String)
    message = Column(Text)
    status = Column(String, default="pending")  # pending, responded
    created_at = Column(DateTime, default=datetime.utcnow)


class Notification(Base):
    __tablename__ = "notifications"
    
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String)  # space, enquiry, provider
    message = Column(String)
    read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)