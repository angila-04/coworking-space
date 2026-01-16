from pydantic import BaseModel

class RegisterSchema(BaseModel):
    name: str
    email: str
    mobile: str
    password: str
    role: str

class LoginSchema(BaseModel):
    email: str
    password: str

class BookingBase(BaseModel):
    user_name: str
    space_name: str
    date: str
    time: str

class BookingCreate(BookingBase):
    pass

class BookingUpdateStatus(BaseModel):
    status: str  # Approved or Rejected

class Booking(BookingBase):
    id: int
    status: str
