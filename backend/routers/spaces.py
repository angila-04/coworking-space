from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import os
import shutil

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
        amenities=",".join(space.amenities),
        hourly_rate=space.hourly_rate,
        daily_rate=space.daily_rate,
        weekly_rate=space.weekly_rate,
        availability_start=space.availability_start,
        availability_end=space.availability_end,
        availability_days=",".join(space.availability_days)
    )

    db.add(new_space)
    db.commit()
    db.refresh(new_space)

    return {"space_id": new_space.id}


# -----------------------------------------
# UPLOAD SPACE IMAGES
# -----------------------------------------
UPLOAD_DIR = "uploads/space_images"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/{space_id}/images")
def upload_space_images(
    space_id: int,
    images: List[UploadFile] = File(...),
    db: Session = Depends(get_db)
):
    space = db.query(Space).filter(Space.id == space_id).first()
    if not space:
        raise HTTPException(status_code=404, detail="Space not found")

    for image in images:
        file_path = os.path.join(UPLOAD_DIR, image.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        img = SpaceImage(
            space_id=space_id,
            image_path=file_path
        )
        db.add(img)

    db.commit()
    return {"message": "Images uploaded successfully"}


# -----------------------------------------
# GET ALL SPACES (MySpaces.jsx)
# -----------------------------------------
@router.get("/", response_model=List[SpaceListResponse])
def get_all_spaces(db: Session = Depends(get_db)):
    spaces = db.query(Space).all()

    return [
        {
            "id": s.id,
            "name": s.name,
            "location": s.location,
            "hourly_rate": s.hourly_rate,
            "daily_rate": s.daily_rate,
            "weekly_rate": s.weekly_rate,
            "amenities": s.amenities.split(",") if s.amenities else [],
        }
        for s in spaces
    ]


# -----------------------------------------
# GET SINGLE SPACE (EditSpace.jsx)
# -----------------------------------------
@router.get("/{space_id}", response_model=SpaceDetailResponse)
def get_space(space_id: int, db: Session = Depends(get_db)):
    space = db.query(Space).filter(Space.id == space_id).first()

    if not space:
        raise HTTPException(status_code=404, detail="Space not found")

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
        "availability_start": space.availability_start,
        "availability_end": space.availability_end,
        "availability_days": space.availability_days.split(",") if space.availability_days else [],
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
    db_space.amenities = ",".join(space.amenities)
    db_space.hourly_rate = space.hourly_rate
    db_space.daily_rate = space.daily_rate
    db_space.weekly_rate = space.weekly_rate
    db_space.availability_start = space.availability_start
    db_space.availability_end = space.availability_end
    db_space.availability_days = ",".join(space.availability_days)

    db.commit()
    return {"message": "Space updated successfully"}


# -----------------------------------------
# DELETE SPACE (Delete Button)
# -----------------------------------------
@router.delete("/{space_id}")
def delete_space(space_id: int, db: Session = Depends(get_db)):
    space = db.query(Space).filter(Space.id == space_id).first()

    if not space:
        raise HTTPException(status_code=404, detail="Space not found")

    db.delete(space)
    db.commit()

    return {"message": "Space deleted successfully"}
