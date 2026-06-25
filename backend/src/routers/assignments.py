from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import Assignment, TutorRequest, User, UserRole, RequestStatus, Notification, Schedule
from ..schemas import AssignmentResponse, AssignmentCreate
from ..auth import get_current_user

router = APIRouter(prefix="/api/assignments", tags=["assignments"])

@router.get("/", response_model=List[AssignmentResponse])
def get_assignments(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Not authorized")
    return db.query(Assignment).all()

@router.get("/my", response_model=List[AssignmentResponse])
def get_my_assignments(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role == UserRole.TUTOR and current_user.tutor_profile:
        return db.query(Assignment).filter(Assignment.tutor_id == current_user.tutor_profile.id).all()
    elif current_user.role == UserRole.STUDENT and current_user.student_profile:
        return db.query(Assignment).filter(Assignment.student_id == current_user.student_profile.id).all()
    else:
        raise HTTPException(status_code=403, detail="Not authorized")

@router.post("/", response_model=AssignmentResponse, status_code=status.HTTP_201_CREATED)
def create_assignment(assign_in: AssignmentCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    req = db.query(TutorRequest).filter(TutorRequest.id == assign_in.request_id).first()
    if not req:
        raise HTTPException(status_code=404, detail="Request not found")
    
    # Check if already assigned
    existing = db.query(Assignment).filter(Assignment.request_id == req.id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Request already has an assignment")
    
    # Update request status
    req.status = RequestStatus.FILLED
    db.commit()

    new_assignment = Assignment(
        request_id=assign_in.request_id,
        tutor_id=assign_in.tutor_id,
        student_id=assign_in.student_id
    )
    db.add(new_assignment)
    db.commit()
    db.refresh(new_assignment)

    # Generate Schedule based on request's proposed time and day
    # Just creating one primary schedule record representing the recurring schedule
    new_schedule = Schedule(
        assignment_id=new_assignment.id,
        day_of_week=req.days_of_week or "TBD",
        time=req.time or "TBD",
        duration=req.duration or "TBD"
    )
    db.add(new_schedule)
    db.commit()
    db.refresh(new_assignment) # to load schedules

    # Notify Tutor and Student
    tutor_notif = Notification(
        user_id=new_assignment.tutor.user_id,
        title="New Assignment",
        message=f"You have been assigned to '{req.subject}'. Check your schedule."
    )
    student_notif = Notification(
        user_id=new_assignment.student.user_id,
        title="Tutor Assigned",
        message=f"A tutor has been assigned for '{req.subject}'. Check your schedule."
    )
    db.add(tutor_notif)
    db.add(student_notif)
    db.commit()

    return new_assignment
