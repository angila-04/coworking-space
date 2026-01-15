# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from typing import List

# from database import get_db
# from models import Booking as BookingModel
# from schemas import BookingCreate, BookingUpdateStatus, Booking as BookingSchema


# router = APIRouter(prefix="/bookings", tags=["bookings"])

# # GET all bookings
# @router.get("/", response_model=List[BookingSchema])
# def get_bookings(db: Session = Depends(get_db)):
#     return db.query(BookingModel).all()

# # POST new booking (optional)
# @router.post("/", response_model=BookingSchema)
# def create_booking(booking: BookingCreate,
#                     db: Session = Depends(get_db)):
    
#     db_booking = BookingModel(**booking.model_dump())
#     db.add(db_booking)
#     db.commit()
#     db.refresh(db_booking)
#     return db_booking

# # PATCH booking status
# @router.patch("/{booking_id}", response_model=BookingSchema)
# def update_booking_status(booking_id: int,
#                            status: BookingUpdateStatus, 
#                            db: Session = Depends(get_db)):
#     booking = db.query(BookingModel).filter(BookingModel.id == booking_id).first()

#     if not booking:
#         raise HTTPException(status_code=404, detail="Booking not found")
    
#     booking.status = status.status
#     db.commit()
#     db.refresh(booking)
#     return booking



from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from activitylog import activity_logs, ActivityLog
from payments import payments, Payment


app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ DATA MODEL ------------------

class Booking(BaseModel):
    id: int
    customer: str
    service: str
    date: str
    time: str
    status: str

# ------------------ MOCK DATABASE ------------------

bookings: List[Booking] = [
    Booking(
        id=1,
        customer="Rahul",
        service="Meeting Room",
        date="2026-01-20",
        time="10:00 AM",
        status="Upcoming"
    ),
    Booking(
        id=2,
        customer="Anita",
        service="Private Office",
        date="2026-01-18",
        time="2:00 PM",
        status="Completed"
    ),
]

# ------------------ API ENDPOINTS ------------------

@app.get("/api/bookings")
def get_all_bookings():
    return bookings


@app.get("/api/bookings/{booking_id}")
def get_booking_by_id(booking_id: int):
    for booking in bookings:
        if booking.id == booking_id:
            return booking
    raise HTTPException(status_code=404, detail="Booking not found")


class StatusUpdate(BaseModel):
    status: str


@app.put("/api/bookings/{booking_id}/status")
def update_booking_status(booking_id: int, data: StatusUpdate):
    for booking in bookings:
        if booking.id == booking_id:
            booking.status = data.status

            # ✅ ACTIVITY LOG (always)
            activity_logs.append(
                ActivityLog(
                    id=len(activity_logs) + 1,
                    action=f"BOOKING_{data.status.upper()}",
                    message=f"You marked booking #{booking_id} as {data.status}",
                    timestamp=datetime.now().strftime("%Y-%m-%d %I:%M %p")
                )
            )

            # ✅ PAYMENT (only when completed)
            if data.status.lower() == "completed":
                payments.append(
                    Payment(
                        id=len(payments) + 1,
                        booking_id=booking_id,
                        amount=2000,  # example amount
                        status="Paid",
                        date=datetime.now().strftime("%Y-%m-%d")
                    )
                )

                # ✅ PAYMENT ACTIVITY LOG
                activity_logs.append(
                    ActivityLog(
                        id=len(activity_logs) + 1,
                        action="PAYMENT_RECEIVED",
                        message=f"Payment received for booking #{booking_id}",
                        timestamp=datetime.now().strftime("%Y-%m-%d %I:%M %p")
                    )
                )

            return {
                "message": "Status updated successfully",
                "booking": booking
            }

    raise HTTPException(status_code=404, detail="Booking not found")


