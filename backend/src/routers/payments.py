from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import Payment, User
from ..schemas import PaymentResponse
from ..auth import get_current_user

router = APIRouter(prefix="/api/payments", tags=["payments"])

@router.get("/", response_model=List[PaymentResponse])
def get_payments(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Payment).all()
