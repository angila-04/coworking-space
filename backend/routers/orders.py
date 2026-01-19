from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Order
from schemas import OrderCreate, OrderResponse

router = APIRouter(prefix="/orders", tags=["Orders"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=OrderResponse)
def create_order(order: OrderCreate, user_id: int, db: Session = Depends(get_db)):
    new_order = Order(
        user_id=user_id,
        space_id=order.space_id,
        amount=order.amount
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return new_order
