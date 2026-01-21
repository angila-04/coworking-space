from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime,Text, Date, Time
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

# -------------------- BOOKING --------------------

class Booking(Base):
    __tablename__ = "bookings"  # This will be the table name in your DB

    id = Column(Integer, primary_key=True, index=True)
    
    booking_code = Column(String, unique=True, index=True)  # Example: BKG12345
    user_id = Column(Integer, nullable=False)              # Who booked
    user_name = Column(String, nullable=False)
    provider_id = Column(Integer, nullable=False)          # Space owner
    space_id = Column(Integer, nullable=False)            # Space booked
    space_name = Column(String, nullable=False)
    
    booking_date = Column(Date, nullable=False)           # Date of booking
    start_time = Column(Time, nullable=False)            # Start time
    end_time = Column(Time, nullable=False)              # End time
    
    total_amount = Column(Float, nullable=False)
    payment_status = Column(String, default="pending")   # pending / paid / failed
    
    booking_status = Column(String, default="pending")   # pending / confirmed / completed / cancelled

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
 

# -------------------- SPACE --------------------
class Space(Base):
    __tablename__ = "spaces"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    mobile = Column(String, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False)



# -------------------- SPACE IMAGE --------------------
class SpaceImage(Base):
    __tablename__ = "space_images"

    id = Column(Integer, primary_key=True, index=True)
    space_id = Column(Integer, ForeignKey("spaces.id"))
    image_url = Column(String)

    space = relationship("Space", back_populates="images")

# -------------------- ORDER --------------------
class Order(Base):
    __tablename__ = "orders"
class SpaceImage(Base):
    __tablename__ = "space_images"

    id = Column(Integer, primary_key=True, index=True)
    space_id = Column(Integer, ForeignKey("spaces.id"), nullable=False)
    image_url = Column(String, nullable=False)
    space = relationship("Space", backref="images")




