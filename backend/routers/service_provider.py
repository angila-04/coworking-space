from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date

from database import get_db
from models import Booking, Space

router = APIRouter(
    prefix="/service-provider",
    tags=["Service Provider"]
)

@router.get("/dashboard/{provider_id}")
def service_provider_dashboard(
    provider_id: int,
    db: Session = Depends(get_db)
):
    # Total spaces
    total_spaces = db.query(Space).filter(
        Space.provider_id == provider_id
    ).count()

    total_bookings = db.query(Booking).filter(
        Booking.provider_id == provider_id
    ).count()

    confirmed_bookings = db.query(Booking).filter(
        Booking.provider_id == provider_id,
        Booking.booking_status == "confirmed"
    ).count()

    # Active bookings
    active_bookings = db.query(Booking).filter(
        Booking.provider_id == provider_id,
        Booking.booking_status == "confirmed"
    ).count()

    # Today's bookings
    todays_bookings = db.query(Booking).filter(
        Booking.provider_id == provider_id,
        Booking.booking_date == date.today()
    ).count()

    # Pending requests
    pending_requests = db.query(Booking).filter(
        Booking.provider_id == provider_id,
        Booking.booking_status == "pending"
    ).count()

    # Earnings (paid only)
    paid_bookings = db.query(Booking).filter(
        Booking.provider_id == provider_id,
        Booking.payment_status == "paid"
    ).all()

    total_earnings = sum(b.total_amount for b in paid_bookings)

    return {
        "stats": {
            "totalSpaces": total_spaces,
            "activeBookings": active_bookings,
            "todaysBookings": todays_bookings,
            "totalBookings": total_bookings,
            "confirmedBookings": confirmed_bookings,
            "pendingRequests": pending_requests,
            "earnings": total_earnings
        }
    }
