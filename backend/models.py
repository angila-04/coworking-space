from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from database import Base
from sqlalchemy.sql import func

class User(Base):
    __tablename__ = "users"

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
    # space_id = Column(Integer, ForeignKey("spaces.id"), nullable=False)
    booking_time = Column(DateTime(timezone=True), server_default=func.now())
    amount = Column(Float, nullable=False)

