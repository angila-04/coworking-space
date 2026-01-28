from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List

from database import get_db
from models import Booking
from schemas import BookingCreate, BookingUpdateStatus
from schemas import BookingResponse


router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"]
)

# ---------------- CREATE BOOKING (USER) ----------------
@router.post("/")
def create_booking(
    booking: BookingCreate,
    db: Session = Depends(get_db)
):
    new_booking = Booking(
        booking_code=f"BK-{int(datetime.utcnow().timestamp())}",

        user_id=booking.user_id,
        user_name=booking.user_name,

        provider_id=booking.provider_id,
        space_id=booking.space_id,
        space_name=booking.space_name,

        booking_date=booking.booking_date,
        start_time=booking.start_time,
        end_time=booking.end_time,

        total_amount=booking.total_amount,

        booking_status="pending",   # 👈 USER JUST REQUESTED
        payment_status="unpaid"
    )

    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)

    return {
        "message": "Booking request sent",
        "booking_id": new_booking.id
    }

# ---------------- GET BOOKINGS FOR PROVIDER ----------------
@router.get("/provider/{provider_id}")
def get_provider_bookings(
    provider_id: str,
    db: Session = Depends(get_db)
):
    return db.query(Booking).filter(
        Booking.provider_id == provider_id
    ).order_by(Booking.id.desc()).all()


# ---------------- UPDATE BOOKING STATUS ----------------
@router.patch("/{booking_id}")
def update_booking_status(
    booking_id: int,
    status: str,
    db: Session = Depends(get_db)
):
    booking = db.query(Booking).filter(
        Booking.id == booking_id
    ).first()

    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    if status not in ["pending", "approved", "rejected", "cancelled"]:
        raise HTTPException(status_code=400, detail="Invalid status")

    booking.booking_status = status
    db.commit()

    return {"message": "Booking status updated"}

@router.get("/provider/{provider_id}", response_model=List[BookingResponse])
def get_bookings_for_provider(provider_id: int, db: Session = Depends(get_db)):
    bookings = db.query(Booking).filter(Booking.provider_id == provider_id).all()

    if not bookings:
        raise HTTPException(status_code=404, detail="No bookings found for this provider")

    return bookings

@router.get("/user/{user_id}", response_model=List[BookingResponse])
def get_bookings_for_user(user_id: int, db: Session = Depends(get_db)):
    bookings = db.query(Booking).filter(Booking.user_id == user_id).all()

    if not bookings:
        raise HTTPException(status_code=404, detail="No bookings found for this user")

    return bookings
