from sqlalchemy import Column, Integer, String, ForeignKey, DateTime,Text,Float
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
    location = Column(String, nullable=False)
    space_type = Column(String, nullable=False)
    capacity = Column(Integer, nullable=False)
    description = Column(Text)

    amenities = Column(Text)  # Stored as comma-separated string

    hourly_rate = Column(Float)
    daily_rate = Column(Float)
    weekly_rate = Column(Float)

    availability_start = Column(String)
    availability_end = Column(String)
    availability_days = Column(Text)  # comma-separated

    images = relationship("SpaceImage", back_populates="space")


# -------------------- SPACE IMAGES --------------------
class SpaceImage(Base):
    __tablename__ = "space_images"

    id = Column(Integer, primary_key=True, index=True)
    space_id = Column(Integer, ForeignKey("spaces.id", ondelete="CASCADE"),
        nullable=False)
    image_path = Column(String, nullable=False)

    space = relationship("Space", back_populates="images")

    