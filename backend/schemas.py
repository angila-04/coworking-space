from pydantic import BaseModel
from datetime import date, time, datetime
from typing import List, Optional


# -------------------- AUTH --------------------
class RegisterSchema(BaseModel):
    name: str
    email: str
    mobile: str
    password: str
    role: str


class LoginSchema(BaseModel):
    email: str
    password: str


# ===================== ORDER SCHEMAS =====================
class OrderCreate(BaseModel):
    space_id: int
    amount: float

class OrderResponse(BaseModel):
    id: int
    user_id: int
    space_id: int
    amount: float
    booking_time: datetime



# -------------------- BOOKING --------------------
class BookingBase(BaseModel):
    user_id: int
    provider_id: int
    space_id: int
    user_name: str
    space_name: str
    booking_date: date
    start_time: time
    end_time: time
    total_amount: float

class BookingCreate(BookingBase):
    pass  # For creating a new booking

class BookingResponse(BookingBase):
    id: int
    booking_code: str
    payment_status: Optional[str] = "pending"   # pending | paid | failed
    booking_status: Optional[str] = "pending"   # pending | confirmed | completed | cancelled
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True

class BookingUpdateStatus(BaseModel):
    booking_status: str  # pending | confirmed | completed | cancelled




# -------------------- SPACE (CREATE / UPDATE) --------------------
class SpaceCreate(BaseModel):
    name: str
    location: str
    space_type: str
    capacity: int
    description: Optional[str] = None

    amenities: List[str]

    hourly_rate: Optional[float] = None
    daily_rate: Optional[float] = None
    weekly_rate: Optional[float] = None

    availability_start: Optional[str] = None
    availability_end: Optional[str] = None
    availability_days: List[str]


# -------------------- SPACE RESPONSE (POST) --------------------
class SpaceResponse(BaseModel):
    space_id: int


# -------------------- SPACE LIST (MySpaces.jsx) --------------------
class SpaceListResponse(BaseModel):
    id: int
    name: str
    location: str
    hourly_rate: Optional[float]
    daily_rate: Optional[float]
    weekly_rate: Optional[float]
    amenities: List[str]

    class Config:
        from_attributes = True


# -------------------- SPACE DETAIL (EditSpace.jsx) --------------------
class SpaceDetailResponse(BaseModel):
    id: int
    name: str
    location: str
    space_type: str
    capacity: int
    description: Optional[str]

    amenities: List[str]

    hourly_rate: Optional[float]
    daily_rate: Optional[float]
    weekly_rate: Optional[float]

    availability_start: Optional[str]
    availability_end: Optional[str]
    availability_days: List[str]

    class Config:
        from_attributes = True


# -------------------- COMMON MESSAGE --------------------
class MessageResponse(BaseModel):
    message: str


# -------------------- SPACE IMAGE --------------------
class SpaceImageResponse(BaseModel):
    id: int
    space_id: int
    image_path: str

    class Config:
        from_attributes = True


class BookingResponse(BaseModel):
    id: int
    booking_code: str
    user_id: int
    user_name: str
    provider_id: int
    space_id: int
    space_name: str
    booking_date: date
    start_time: time
    end_time: time
    total_amount: float
    payment_status: str
    booking_status: str
    created_at: datetime

    class Config:
        from_attributes = True


