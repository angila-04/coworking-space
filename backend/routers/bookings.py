from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models import Booking as BookingModel
from schemas import BookingCreate, BookingUpdateStatus, Booking as BookingSchema


router = APIRouter(prefix="/bookings", tags=["bookings"])

# GET all bookings
@router.get("/", response_model=List[BookingSchema])
def get_bookings(db: Session = Depends(get_db)):
    return db.query(BookingModel).all()

# POST new booking (optional)
@router.post("/", response_model=BookingSchema)
def create_booking(booking: BookingCreate,
                    db: Session = Depends(get_db)):
    
    db_booking = BookingModel(**booking.model_dump())
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

# PATCH booking status
@router.patch("/{booking_id}", response_model=BookingSchema)
def update_booking_status(booking_id: int,
                           status: BookingUpdateStatus, 
                           db: Session = Depends(get_db)):
    booking = db.query(BookingModel).filter(BookingModel.id == booking_id).first()

    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    booking.status = status.status
    db.commit()
    db.refresh(booking)
    return booking
