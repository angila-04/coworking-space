from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Booking, User
from auth import get_current_user

router = APIRouter(
    prefix="/payments",
    tags=["Payments"]
)

# =====================================================
# USER SIDE – PAY FOR A BOOKING
# =====================================================
@router.post("/pay/{booking_id}")
def pay_for_booking(
    booking_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    USER pays for a booking
    """

    # 1️⃣ Fetch booking
    booking = db.query(Booking).filter(Booking.id == booking_id).first()

    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    # 2️⃣ Check booking belongs to this user
    if booking.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="This booking does not belong to you")

    # 3️⃣ Prevent double payment
    if booking.payment_status == "paid":
        raise HTTPException(status_code=400, detail="Booking already paid")

    # 4️⃣ PAYMENT SUCCESS (mock / simulated)
    # Later integrate Razorpay / Stripe here
    booking.payment_status = "paid"
    booking.booking_status = "confirmed"


    db.commit()
    db.refresh(booking)

    return {
        "message": "Payment successful",
        "booking_id": booking.id,
        "amount": booking.total_amount,
        "payment_status": booking.payment_status
    }


# =====================================================
# PROVIDER SIDE – VIEW PAYMENTS & EARNINGS
# =====================================================
@router.get("/provider")
def provider_payments(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    PROVIDER views all bookings & payments related to them
    """

    # 1️⃣ Only provider allowed
    if current_user.role != "provider":
        raise HTTPException(status_code=403, detail="Access denied")

    # 2️⃣ Fetch provider bookings
    bookings = (
        db.query(Booking)
        .filter(Booking.provider_id == current_user.id)
        .all()
    )

    # 3️⃣ Return formatted data
    return [
        {
            "booking_id": b.id,
            "space_name": b.space_name,
            "user_name": b.user_name,
            "booking_date": b.booking_date,
            "amount": b.total_amount,
            "payment_status": b.payment_status
        }
        for b in bookings
    ]
