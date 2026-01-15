# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session

# from database import SessionLocal
# from models import User
# from schemas import RegisterSchema, LoginSchema

# router = APIRouter(prefix="/auth", tags=["Auth"])

# # DB dependency
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# # REGISTER
# @router.post("/register")
# def register(data: RegisterSchema, db: Session = Depends(get_db)):
#     existing_user = db.query(User).filter(User.email == data.email).first()
#     if existing_user:
#         raise HTTPException(status_code=400, detail="Email already exists")

#     new_user = User(
#         email=data.email,
#         password=data.password,  # ❌ plain text (temporary)
#         role=data.role
#     )

#     db.add(new_user)
#     db.commit()

#     return {"message": "Registered successfully"}

# # LOGIN
# @router.post("/login")
# def login(data: LoginSchema, db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.email == data.email).first()

#     if not user:
#         raise HTTPException(status_code=400, detail="Invalid credentials")

#     if user.password != data.password:
#         raise HTTPException(status_code=400, detail="Invalid credentials")

#     return {
#         "message": "Login successful",
#         "role": user.role
#     }


from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User
from schemas import RegisterSchema, LoginSchema

router = APIRouter(prefix="/auth", tags=["Auth"])

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

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
