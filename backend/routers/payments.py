# backend/routes/payments.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Booking

router = APIRouter(
    prefix="/payments",
    tags=["Payments"]
)

# ----------------- PAY NOW -----------------
@router.post("/pay/{booking_id}")
def pay_booking(booking_id: int, db: Session = Depends(get_db)):
    # 1. Check booking exists
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    # 2. Check if already paid
    if booking.payment_status == "paid":
        raise HTTPException(status_code=400, detail="Booking already paid")

    # 3. Simulate payment success
    # In real app: integrate payment gateway here
    booking.payment_status = "paid"
    booking.status = "confirmed"  # optional: mark confirmed after payment

    db.commit()
    db.refresh(booking)

    return {
        "message": "Payment successful",
        "booking_id": booking.id,
        "payment_status": booking.payment_status
    }


# ----------------- CHECK PAYMENT STATUS -----------------
@router.get("/status/{booking_id}")
def payment_status(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"booking_id": booking.id, "payment_status": booking.payment_status}

# ----------------- OPTIONAL: REFUND -----------------
@router.post("/refund/{booking_id}")
def refund_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    if booking.payment_status != "paid":
        raise HTTPException(status_code=400, detail="Cannot refund unpaid booking")

    # Simulate refund
    booking.payment_status = "unpaid"
    booking.status = "cancelled"

    db.commit()
    db.refresh(booking)

    return {"message": "Booking refunded", "booking_id": booking.id}
