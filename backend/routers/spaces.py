from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import os
import shutil
from datetime import datetime

from database import get_db
from models import Space, SpaceImage
from schemas import (
    SpaceCreate,
    SpaceResponse,
    SpaceListResponse,
    SpaceDetailResponse
)

router = APIRouter(
    prefix="/spaces",
    tags=["Spaces"]
)


# -----------------------------------------
# UPLOAD DIRECTORY SETUP
# -----------------------------------------
UPLOAD_DIR = "uploads/space_images"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# -----------------------------------------
# CREATE SPACE (AddSpace.jsx)
# -----------------------------------------
@router.post("/", response_model=SpaceResponse)
def create_space(space: SpaceCreate, db: Session = Depends(get_db)):
    new_space = Space(
        name=space.name,
        location=space.location,
        space_type=space.space_type,
        capacity=space.capacity,
        description=space.description,
        amenities=",".join(space.amenities)if space.amenities else "",
        hourly_rate=space.hourly_rate,
        daily_rate=space.daily_rate,
        weekly_rate=space.weekly_rate,
        available_start=space.available_start,   
        available_end=space.available_end, 
        available_days=",".join(space.available_days)if space.available_days else "",
        provider_id=space.provider_id if hasattr(space, 'provider_id') else 1 
    )

    db.add(new_space)
    db.commit()
    db.refresh(new_space)

    return {"space_id": new_space.id}


# -----------------------------------------
# UPLOAD SPACE IMAGES  (MULTIPLE)
# -----------------------------------------

@router.post("/{space_id}/images")
def upload_space_images(
    space_id: int,
    images: List[UploadFile] = File(...),
    db: Session = Depends(get_db)
):
    space = db.query(Space).filter(Space.id == space_id).first()
    if not space:
        raise HTTPException(status_code=404, detail="Space not found")
    
    uploaded_images = []

    for image in images:
        # Generate unique filename
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        file_extension = os.path.splitext(image.filename)[1]
        unique_filename = f"space_{space_id}_{timestamp}_{image.filename}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)

        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        # save to database
        img = SpaceImage(
            space_id=space_id,
            image_url=f"/uploads/space_images/{unique_filename}"
        )
        db.add(img)
        uploaded_images.append(img.image_url)


    db.commit()
    return {
        "message": f"{len(uploaded_images)} images uploaded successfully",
        "images": uploaded_images
    }

# -----------------------------------------
# GET ALL SPACES (MySpaces.jsx)
# -----------------------------------------
@router.get("/provider/{provider_id}", response_model=List[SpaceListResponse])
def get_provider_spaces(provider_id: int,db: Session = Depends(get_db)):
    spaces = db.query(Space).filter(Space.provider_id == provider_id).all()


    result = []
    for s in spaces:
        # Get first image or None
        first_image = db.query(SpaceImage).filter(SpaceImage.space_id == s.id).first()
        
        # Get all image URLs
        all_images = db.query(SpaceImage).filter(SpaceImage.space_id == s.id).all()
        image_urls = [img.image_url for img in all_images]
        
        # Determine price (use first available rate)
        price = s.hourly_rate or s.daily_rate or s.weekly_rate or 0
        
        result.append({
            "id": s.id,
            "name": s.name,
            "location": s.location,
            "space_type": s.space_type,
            "capacity": s.capacity,
            "description": s.description,
            "hourly_rate": s.hourly_rate,
            "daily_rate": s.daily_rate,
            "weekly_rate": s.weekly_rate,
            "price": price,  # For display
            "amenities": s.amenities.split(",") if s.amenities else [],
            "is_available": True,  # Default since not in model
            "images": image_urls,
            "main_image": first_image.image_url if first_image else None
        })
    return result


# -----------------------------------------
# GET SINGLE SPACE (EditSpace.jsx)
# -----------------------------------------
@router.get("/{space_id}", response_model=SpaceDetailResponse)
def get_space(space_id: int, db: Session = Depends(get_db)):
    space = db.query(Space).filter(Space.id == space_id).first()

    if not space:
        raise HTTPException(status_code=404, detail="Space not found")

    # Get all images
    images = db.query(SpaceImage).filter(SpaceImage.space_id == space_id).all()
    image_urls = [img.image_url for img in images]


    return {
        "id": space.id,
        "name": space.name,
        "location": space.location,
        "space_type": space.space_type,
        "capacity": space.capacity,
        "description": space.description,
        "amenities": space.amenities.split(",") if space.amenities else [],
        "hourly_rate": space.hourly_rate,
        "daily_rate": space.daily_rate,
        "weekly_rate": space.weekly_rate,
        "available_start": str(space.available_start) if space.available_start else "",
        "available_end": str(space.available_end) if space.available_end else "",
        "available_days": space.available_days.split(",") if space.available_days else [],
        "images": image_urls,
        "provider_id": space.provider_id
    }


# -----------------------------------------
# UPDATE SPACE (EditSpace.jsx)
# -----------------------------------------
@router.put("/{space_id}")
def update_space(
    space_id: int,
    space: SpaceCreate,
    db: Session = Depends(get_db)
):
    db_space = db.query(Space).filter(Space.id == space_id).first()

    if not db_space:
        raise HTTPException(status_code=404, detail="Space not found")

    db_space.name = space.name
    db_space.location = space.location
    db_space.space_type = space.space_type
    db_space.capacity = space.capacity
    db_space.description = space.description
    db_space.amenities = ",".join(space.amenities) if space.amenities else ""
    db_space.hourly_rate = space.hourly_rate
    db_space.daily_rate = space.daily_rate
    db_space.weekly_rate = space.weekly_rate
    db_space.available_start = space.available_start
    db_space.available_end = space.available_end
    db_space.available_days = ",".join(space.available_days) if space.available_days else ""

    db.commit()
    return {"message": "Space updated successfully"}

# -----------------------------------------
# TOGGLE AVAILABILITY (MySpaces toggle)
# -----------------------------------------
@router.patch("/{space_id}/availability")
def toggle_availability(
    space_id: int,
    is_available: bool,
    db: Session = Depends(get_db)
):
    space = db.query(Space).filter(Space.id == space_id).first()

    if not space:
        raise HTTPException(status_code=404, detail="Space not found")

    # ✅ SAVE TO DATABASE
    space.is_available = is_available
    db.commit()
    db.refresh(space)

    return {
        "message": "Availability toggled",
        "is_available": space.is_available
    }



# -----------------------------------------
# DELETE SPACE (Delete Button)
# -----------------------------------------
@router.delete("/{space_id}")
def delete_space(space_id: int, db: Session = Depends(get_db)):
    space = db.query(Space).filter(Space.id == space_id).first()

    if not space:
        raise HTTPException(status_code=404, detail="Space not found")

    # Delete associated images from database
    db.query(SpaceImage).filter(SpaceImage.space_id == space_id).delete()
    
    # Delete space
    db.delete(space)
    db.commit()

    return {"message": "Space deleted successfully"}


# -----------------------------------------
# DELETE SINGLE IMAGE
# -----------------------------------------
@router.delete("/{space_id}/images/{image_id}")
def delete_space_image(
    space_id: int,
    image_id: int,
    db: Session = Depends(get_db)
):
    """Delete a specific image from a space"""
    image = db.query(SpaceImage).filter(
        SpaceImage.id == image_id,
        SpaceImage.space_id == space_id
    ).first()
    
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    
    # Delete file from filesystem
    file_path = image.image_url.lstrip('/')
    if os.path.exists(file_path):
        os.remove(file_path)
    
    # Delete from database
    db.delete(image)
    db.commit()
    
    return {"message": "Image deleted successfully"}
