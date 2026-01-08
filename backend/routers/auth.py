# backend/routers/auth.py

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

# ----------------------------
# Request models
# ----------------------------
class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    role: str  # "user", "provider", "admin"

class LoginRequest(BaseModel):
    email: str
    password: str

# ----------------------------
# Register Endpoint
# ----------------------------
@router.post("/register")
def register(data: RegisterRequest):
    # Validate role
    if data.role not in ["user", "provider", "admin"]:
        return {"message": "Invalid role. Must be user, provider, or admin."}

    # Dummy response (no database yet)
    return {
        "message": "Registration successful",
        "role": data.role
    }

# ----------------------------
# Login Endpoint
# ----------------------------
@router.post("/login")
def login(data: LoginRequest):
    # Dummy login logic (no DB)
    if data.email and data.password:
        # Assign role based on email for demo purposes
        email_lower = data.email.lower()
        if "admin" in email_lower:
            role = "admin"
        elif "provider" in email_lower:
            role = "provider"
        else:
            role = "user"

        return {
            "message": "Login successful",
            "role": role
        }

    # Invalid credentials
    return {"message": "Invalid credentials"}
