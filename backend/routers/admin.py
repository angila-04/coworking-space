# routers/admin.py
# Create this file in your FastAPI project

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
from database import SessionLocal
from models import User, Space, Booking, Enquiry, Notification, SpaceImage
from pydantic import BaseModel
from datetime import datetime

router = APIRouter(prefix="/api/admin", tags=["Admin"])

# ================= DATABASE DEPENDENCY =================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ================= SCHEMAS =================
class StatusUpdate(BaseModel):
    status: str


class EnquiryCreate(BaseModel):
    name: str
    email: str
    phone: str
    type: str
    subject: str
    message: str


class NotificationCreate(BaseModel):
    type: str
    message: str


# ================= ADMIN STATS ENDPOINT =================
@router.get("/stats")
def get_admin_stats(db: Session = Depends(get_db)):
    """Get dashboard statistics"""
    
    total_spaces = db.query(Space).count()
    total_users = db.query(User).filter(User.role == "user").count()
    pending_spaces = db.query(Space).filter(Space.status == "pending").count()
    pending_enquiries = db.query(Enquiry).filter(Enquiry.status == "pending").count()
    
    # Get total bookings and calculate revenue
    total_bookings = db.query(Booking).count()
    total_revenue = db.query(func.sum(Booking.total_amount)).scalar() or 0
    
    # Calculate occupancy rate (approved spaces / total spaces)
    approved_spaces = db.query(Space).filter(Space.status == "approved").count()
    occupancy_rate = (approved_spaces / total_spaces * 100) if total_spaces > 0 else 0
    
    return {
        "totalSpaces": total_spaces,
        "totalUsers": total_users,
        "pendingSpaces": pending_spaces,
        "pendingEnquiries": pending_enquiries,
        "pendingProviders": 0,  # You don't have ServiceProvider model yet
        "revenue": float(total_revenue),
        "occupancyRate": round(occupancy_rate, 2)
    }


# ================= SPACES MANAGEMENT =================
@router.get("/spaces")
def get_all_spaces(db: Session = Depends(get_db)):
    """Get all spaces for admin review"""
    spaces = db.query(Space).order_by(Space.created_at.desc()).all()
    
    return {
        "spaces": [
            {
                "id": space.id,
                "name": space.name,
                "owner": space.name,  # Using space name as owner for now
                "email": space.email,
                "phone": space.mobile,
                "address": "N/A",  # Add this field to Space model if needed
                "capacity": 0,  # Add this field to Space model if needed
                "amenities": [],  # Add this field to Space model if needed
                "price": 0,  # Add this field to Space model if needed
                "status": space.status,
                "description": "",  # Add this field to Space model if needed
                "registrationDate": space.created_at.isoformat(),
                "images": [img.image_url for img in space.images] if space.images else []
            }
            for space in spaces
        ]
    }


@router.put("/spaces/{space_id}")
def update_space_status(space_id: int, status_update: StatusUpdate, db: Session = Depends(get_db)):
    """Update space approval status"""
    space = db.query(Space).filter(Space.id == space_id).first()
    
    if not space:
        raise HTTPException(status_code=404, detail="Space not found")
    
    # Validate status
    valid_statuses = ["pending", "approved", "rejected"]
    if status_update.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
    
    space.status = status_update.status
    db.commit()
    db.refresh(space)
    
    # Create notification
    notification = Notification(
        type="space",
        message=f"Space '{space.name}' has been {status_update.status}",
        read=False
    )
    db.add(notification)
    db.commit()
    
    return {
        "success": True,
        "message": f"Space {status_update.status}",
        "space": {
            "id": space.id,
            "name": space.name,
            "status": space.status
        }
    }


@router.delete("/spaces/{space_id}")
def delete_space(space_id: int, db: Session = Depends(get_db)):
    """Delete a space"""
    space = db.query(Space).filter(Space.id == space_id).first()
    
    if not space:
        raise HTTPException(status_code=404, detail="Space not found")
    
    # Delete associated images first
    db.query(SpaceImage).filter(SpaceImage.space_id == space_id).delete()
    
    # Delete space
    db.delete(space)
    db.commit()
    
    return {"success": True, "message": "Space deleted successfully"}


# ================= ENQUIRIES MANAGEMENT =================
@router.get("/enquiries")
def get_all_enquiries(db: Session = Depends(get_db)):
    """Get all user and corporate enquiries"""
    enquiries = db.query(Enquiry).order_by(Enquiry.created_at.desc()).all()
    
    return {
        "enquiries": [
            {
                "id": enquiry.id,
                "name": enquiry.name,
                "email": enquiry.email,
                "phone": enquiry.phone,
                "type": enquiry.type,
                "subject": enquiry.subject,
                "message": enquiry.message,
                "status": enquiry.status,
                "date": enquiry.created_at.isoformat()
            }
            for enquiry in enquiries
        ]
    }


@router.post("/enquiries")
def create_enquiry(enquiry: EnquiryCreate, db: Session = Depends(get_db)):
    """Create a new enquiry"""
    new_enquiry = Enquiry(
        name=enquiry.name,
        email=enquiry.email,
        phone=enquiry.phone,
        type=enquiry.type,
        subject=enquiry.subject,
        message=enquiry.message,
        status="pending"
    )
    
    db.add(new_enquiry)
    db.commit()
    db.refresh(new_enquiry)
    
    # Create notification
    notification = Notification(
        type="enquiry",
        message=f"New enquiry from {enquiry.name}",
        read=False
    )
    db.add(notification)
    db.commit()
    
    return {
        "success": True,
        "message": "Enquiry submitted successfully",
        "enquiry_id": new_enquiry.id
    }


@router.put("/enquiries/{enquiry_id}")
def update_enquiry_status(enquiry_id: int, status_update: StatusUpdate, db: Session = Depends(get_db)):
    """Update enquiry status"""
    enquiry = db.query(Enquiry).filter(Enquiry.id == enquiry_id).first()
    
    if not enquiry:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    
    valid_statuses = ["pending", "responded"]
    if status_update.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
    
    enquiry.status = status_update.status
    db.commit()
    
    return {
        "success": True,
        "message": f"Enquiry marked as {status_update.status}"
    }


@router.delete("/enquiries/{enquiry_id}")
def delete_enquiry(enquiry_id: int, db: Session = Depends(get_db)):
    """Delete an enquiry"""
    enquiry = db.query(Enquiry).filter(Enquiry.id == enquiry_id).first()
    
    if not enquiry:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    
    db.delete(enquiry)
    db.commit()
    
    return {"success": True, "message": "Enquiry deleted successfully"}


# ================= BOOKINGS MANAGEMENT =================
@router.get("/bookings")
def get_all_bookings(db: Session = Depends(get_db)):
    """Get all bookings"""
    bookings = db.query(Booking).order_by(Booking.created_at.desc()).all()
    
    return {
        "bookings": [
            {
                "id": booking.id,
                "bookingCode": booking.booking_code,
                "userId": booking.user_id,
                "userName": booking.user_name,
                "providerId": booking.provider_id,
                "spaceId": booking.space_id,
                "spaceName": booking.space_name,
                "bookingDate": booking.booking_date.isoformat(),
                "startTime": booking.start_time.isoformat(),
                "endTime": booking.end_time.isoformat(),
                "totalAmount": booking.total_amount,
                "paymentStatus": booking.payment_status,
                "bookingStatus": booking.booking_status,
                "createdAt": booking.created_at.isoformat()
            }
            for booking in bookings
        ]
    }


@router.put("/bookings/{booking_id}")
def update_booking_status(booking_id: int, status_update: StatusUpdate, db: Session = Depends(get_db)):
    """Update booking status"""
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    booking.booking_status = status_update.status
    db.commit()
    
    return {
        "success": True,
        "message": f"Booking status updated to {status_update.status}"
    }


# ================= NOTIFICATIONS =================
@router.get("/notifications")
def get_notifications(db: Session = Depends(get_db)):
    """Get all admin notifications"""
    notifications = db.query(Notification).order_by(Notification.created_at.desc()).limit(50).all()
    
    return {
        "notifications": [
            {
                "id": notification.id,
                "type": notification.type,
                "message": notification.message,
                "time": get_time_ago(notification.created_at),
                "read": notification.read,
                "createdAt": notification.created_at.isoformat()
            }
            for notification in notifications
        ]
    }


@router.put("/notifications/{notification_id}")
def mark_notification_read(notification_id: int, db: Session = Depends(get_db)):
    """Mark notification as read"""
    notification = db.query(Notification).filter(Notification.id == notification_id).first()
    
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    notification.read = True
    db.commit()
    
    return {"success": True, "message": "Notification marked as read"}


@router.put("/notifications/mark-all-read")
def mark_all_notifications_read(db: Session = Depends(get_db)):
    """Mark all notifications as read"""
    db.query(Notification).update({"read": True})
    db.commit()
    
    return {"success": True, "message": "All notifications marked as read"}


@router.post("/notifications")
def create_notification(notification: NotificationCreate, db: Session = Depends(get_db)):
    """Create a new notification"""
    new_notification = Notification(
        type=notification.type,
        message=notification.message,
        read=False
    )
    
    db.add(new_notification)
    db.commit()
    db.refresh(new_notification)
    
    return {
        "success": True,
        "notification_id": new_notification.id
    }


# ================= USERS MANAGEMENT =================
@router.get("/users")
def get_all_users(db: Session = Depends(get_db)):
    """Get all users (excluding admins)"""
    users = db.query(User).filter(User.role != "admin").all()
    
    return {
        "users": [
            {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "mobile": user.mobile,
                "role": user.role,
                "status": "active"  # Add status field to User model if needed
            }
            for user in users
        ]
    }


@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    """Delete a user"""
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.role == "admin":
        raise HTTPException(status_code=403, detail="Cannot delete admin users")
    
    db.delete(user)
    db.commit()
    
    return {"success": True, "message": "User deleted successfully"}


# ================= HELPER FUNCTIONS =================
def get_time_ago(dt: datetime) -> str:
    """Convert datetime to human-readable time ago format"""
    now = datetime.utcnow()
    diff = now - dt
    
    seconds = diff.total_seconds()
    
    if seconds < 60:
        return "Just now"
    elif seconds < 3600:
        minutes = int(seconds / 60)
        return f"{minutes} min ago" if minutes == 1 else f"{minutes} mins ago"
    elif seconds < 86400:
        hours = int(seconds / 3600)
        return f"{hours} hour ago" if hours == 1 else f"{hours} hours ago"
    elif seconds < 604800:
        days = int(seconds / 86400)
        return f"{days} day ago" if days == 1 else f"{days} days ago"
    else:
        weeks = int(seconds / 604800)
        return f"{weeks} week ago" if weeks == 1 else f"{weeks} weeks ago"


# ================= DASHBOARD ANALYTICS =================
@router.get("/analytics/revenue")
def get_revenue_analytics(db: Session = Depends(get_db)):
    """Get revenue analytics for charts"""
    # Get bookings grouped by month
    from sqlalchemy import extract, func
    
    revenue_data = db.query(
        extract('month', Booking.created_at).label('month'),
        func.sum(Booking.total_amount).label('revenue')
    ).group_by('month').all()
    
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    return {
        "revenue": [
            {
                "month": months[int(month) - 1],
                "revenue": float(revenue)
            }
            for month, revenue in revenue_data
        ]
    }


@router.get("/analytics/bookings")
def get_booking_analytics(db: Session = Depends(get_db)):
    """Get booking status distribution"""
    pending = db.query(Booking).filter(Booking.booking_status == "pending").count()
    confirmed = db.query(Booking).filter(Booking.booking_status == "confirmed").count()
    cancelled = db.query(Booking).filter(Booking.booking_status == "cancelled").count()
    
    total = pending + confirmed + cancelled
    
    return {
        "bookings": [
            {
                "name": "Confirmed",
                "value": round((confirmed / total * 100), 1) if total > 0 else 0,
                "color": "#10b981"
            },
            {
                "name": "Pending",
                "value": round((pending / total * 100), 1) if total > 0 else 0,
                "color": "#f59e0b"
            },
            {
                "name": "Cancelled",
                "value": round((cancelled / total * 100), 1) if total > 0 else 0,
                "color": "#ef4444"
            }
        ]
    }