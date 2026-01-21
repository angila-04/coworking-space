from fastapi import APIRouter, Depends, HTTPException,Header
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User
from schemas import RegisterSchema, LoginSchema
from fastapi.security import OAuth2PasswordBearer


router = APIRouter(prefix="/auth", tags=["Auth"])



# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(
    x_user_id: int = Header(None),
    x_role: str = Header(None)
):
    if x_user_id is None or x_role is None:
        raise HTTPException(
            status_code=401,
            detail="User not authenticated"
        )

    return {
        "id": x_user_id,
        "role": x_role
    }

# ================= REGISTER =================
@router.post("/register")
def register(data: RegisterSchema, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already exists")

    user = User(
        name=data.name,
        email=data.email,
        mobile=data.mobile,
        password=data.password,   # plain text (as you requested)
        role=data.role
    )

    db.add(user)
    db.commit()

    return {"message": "Registered successfully"}

# ================= LOGIN =================
@router.post("/login")
def login(data: LoginSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()

    if not user or user.password != data.password:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    return {
        "role": user.role,
        "name": user.name
    }
