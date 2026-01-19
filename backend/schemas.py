from pydantic import BaseModel
from datetime import datetime

class RegisterSchema(BaseModel):
    name: str
    email: str
    mobile: str
    password: str
    role: str

class LoginSchema(BaseModel):
    email: str
    password: str

class OrderCreate(BaseModel):
    space_id: int
    amount: float

class OrderResponse(BaseModel):
    id: int
    user_id: int
    space_id: int
    amount: float
    booking_time: datetime

    class Config:
        from_attributes = True
