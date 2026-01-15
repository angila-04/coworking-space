from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db

router = APIRouter(
    prefix="/service-provider",
    tags=["Service Provider"]
)

@router.get("/dashboard/{provider_id}")
def get_dashboard(provider_id: int, db: Session = Depends(get_db)):
    return {
        "stats": {
            "total_tasks": 10,
            "pending_tasks": 4,
            "completed_tasks": 6
        },
        "today_tasks": [
            {"id": 1, "title": "Clean meeting room", "status": "pending"},
            {"id": 2, "title": "Approve booking", "status": "completed"}
        ],
        "earnings": {
            "total": 25000,
            "this_month": 8000,
            "pending": 2000
        },
        "notifications": [
            {"id": 1, "message": "New booking request"},
            {"id": 2, "message": "Payment received"}
        ]
    }
# ✅ NEW API – Service Provider Home Dashboard
@router.get("/home-dashboard/{provider_id}")
def service_provider_home_dashboard(
    provider_id: int,
    db: Session = Depends(get_db)
):
    return {
        "totalSpaces": 5,
        "totalBookings": 28,
        "pendingRequests": 4,
        "totalEarnings": 42000
    }
