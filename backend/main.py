from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import SessionLocal, engine, Base
from models import User
from schemas import RegisterSchema, LoginSchema

# ================= DATABASE DEPENDENCY =================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ================= FASTAPI APP =================
app = FastAPI(title="Coworking Space API")

# ================= CORS =================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

# ================= REGISTER =================
@app.post("/auth/register", status_code=201)
def register_user(user: RegisterSchema, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        name=user.name,
        email=user.email,
        mobile=user.mobile,
        password=user.password,
        role=user.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": f"{user.role} registered successfully"}

# ================= LOGIN =================
@app.post("/auth/login")
def login_user(user: LoginSchema, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user or user.password != db_user.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {
        "role": db_user.role,
        "name": db_user.name
    }
