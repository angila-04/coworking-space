from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date

from database import get_db
from models import Booking
from schemas import BookingCreate, BookingUpdateStatus

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
        user_name=booking.user_name,
        space_name=booking.space_name,
        date=booking.date,
        time_slot=booking.time,
        number_of_people=booking.number_of_people,
        provider_id=booking.provider_id,
        status="pending",
        payment_status="pending"
    )

    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)

    return new_booking


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

    booking.status = status
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
