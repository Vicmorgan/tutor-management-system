from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel, EmailStr

from ..database import get_db
from ..models import User, UserRole, Tutor, Student, TutorStatus, StudentStatus, Application, ApplicationStatus, TutorRequest
from ..schemas import UserResponse, TutorResponse, StudentResponse, TutorCreate, StudentCreate, TutorUpdate, StudentUpdate
from ..auth import get_current_user, get_password_hash

router = APIRouter(prefix="/api/users", tags=["users"])

class UserUpdateMe(BaseModel):
    full_name: str | None = None
    password: str | None = None
    parent_name: str | None = None
    parent_phone: str | None = None

@router.patch("/me", response_model=UserResponse)
def update_me(update_in: UserUpdateMe, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if update_in.full_name is not None:
        current_user.full_name = update_in.full_name
    if update_in.password is not None and len(update_in.password) > 0:
        current_user.password_hash = get_password_hash(update_in.password)
    
    if current_user.role == UserRole.STUDENT and current_user.student_profile:
        if update_in.parent_name is not None:
            current_user.student_profile.parent_name = update_in.parent_name
        if update_in.parent_phone is not None:
            current_user.student_profile.parent_phone = update_in.parent_phone

    db.commit()
    db.refresh(current_user)
    return current_user

@router.get("/dashboard-stats")
def get_dashboard_stats(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    pending_applications = db.query(Application).filter(Application.status == ApplicationStatus.PENDING).count()
    
    requests = db.query(TutorRequest).order_by(TutorRequest.created_at.desc()).limit(5).all()
    applications = db.query(Application).order_by(Application.applied_at.desc()).limit(5).all()
    
    activities = []
    for r in requests:
        activities.append({
            "id": f"req-{r.id}",
            "type": "request",
            "title": f"New tutor request created for {r.subject}",
            "date": r.created_at.isoformat()
        })
    for a in applications:
        tutor_name = a.tutor.user.full_name if (a.tutor and a.tutor.user) else "Unknown"
        activities.append({
            "id": f"app-{a.id}",
            "type": "application",
            "title": f"New application received from {tutor_name}",
            "date": a.applied_at.isoformat()
        })
    
    activities.sort(key=lambda x: x["date"], reverse=True)
    
    return {
        "pendingApplications": pending_applications,
        "recentActivity": activities[:5]
    }

@router.get("/tutors", response_model=List[TutorResponse])
def get_tutors(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(User).filter(User.role == UserRole.TUTOR).all()

@router.post("/tutors", response_model=TutorResponse, status_code=status.HTTP_201_CREATED)
def create_tutor(user_in: TutorCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Not authorized")
    if db.query(User).filter(User.email == user_in.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(
        email=user_in.email,
        password_hash=get_password_hash(user_in.password),
        full_name=user_in.full_name,
        role=UserRole.TUTOR
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    new_tutor_profile = Tutor(user_id=new_user.id, rating=0.0, status=TutorStatus.ACTIVE)
    db.add(new_tutor_profile)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.patch("/tutors/{user_id}", response_model=TutorResponse)
def update_tutor(user_id: int, tutor_update: TutorUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Not authorized")
    user = db.query(User).filter(User.id == user_id, User.role == UserRole.TUTOR).first()
    if not user or not user.tutor_profile:
        raise HTTPException(status_code=404, detail="Tutor not found")
    
    if tutor_update.rating is not None:
        user.tutor_profile.rating = tutor_update.rating
    if tutor_update.status is not None:
        user.tutor_profile.status = tutor_update.status
    
    db.commit()
    db.refresh(user)
    return user

@router.get("/students", response_model=List[StudentResponse])
def get_students(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(User).filter(User.role == UserRole.STUDENT).all()

@router.post("/students", response_model=StudentResponse, status_code=status.HTTP_201_CREATED)
def create_student(user_in: StudentCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Not authorized")
    if db.query(User).filter(User.email == user_in.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(
        email=user_in.email,
        password_hash=get_password_hash(user_in.password),
        full_name=user_in.full_name,
        role=UserRole.STUDENT
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    new_student_profile = Student(
        user_id=new_user.id,
        parent_name=user_in.parent_name,
        parent_phone=user_in.parent_phone,
        status=StudentStatus.ACTIVE
    )
    db.add(new_student_profile)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.patch("/students/{user_id}", response_model=StudentResponse)
def update_student(user_id: int, student_update: StudentUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Not authorized")
    user = db.query(User).filter(User.id == user_id, User.role == UserRole.STUDENT).first()
    if not user or not user.student_profile:
        raise HTTPException(status_code=404, detail="Student not found")
    
    if student_update.parent_name is not None:
        user.student_profile.parent_name = student_update.parent_name
    if student_update.parent_phone is not None:
        user.student_profile.parent_phone = student_update.parent_phone
    if student_update.status is not None:
        user.student_profile.status = student_update.status
    
    db.commit()
    db.refresh(user)
    return user

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    user_to_delete = db.query(User).filter(User.id == user_id).first()
    if not user_to_delete:
        raise HTTPException(status_code=404, detail="User not found")
        
    db.delete(user_to_delete)
    db.commit()
    return None
