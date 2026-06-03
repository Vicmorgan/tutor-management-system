from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import Course, User
from ..schemas import CourseResponse
from ..auth import get_current_user

router = APIRouter(prefix="/api/courses", tags=["courses"])

@router.get("/", response_model=List[CourseResponse])
def get_courses(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Course).all()
