from pydantic import BaseModel
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


# -------------------- BOOKING --------------------
class BookingBase(BaseModel):
    user_name: str
    space_name: str
    date: str
    time: str


class BookingCreate(BookingBase):
    pass


class BookingUpdateStatus(BaseModel):
    status: str


class Booking(BookingBase):
    id: int
    status: str


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
