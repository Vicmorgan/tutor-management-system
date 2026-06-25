from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import TutorRequest, User, UserRole, RequestStatus, Notification, Tutor
from ..schemas import TutorRequestResponse, TutorRequestCreate, TutorRequestUpdate
from ..auth import get_current_user

router = APIRouter(prefix="/api/requests", tags=["requests"])

@router.get("/", response_model=List[TutorRequestResponse])
def get_requests(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role == UserRole.ADMIN:
        return db.query(TutorRequest).all()
    elif current_user.role == UserRole.TUTOR:
        return db.query(TutorRequest).filter(TutorRequest.status == RequestStatus.OPEN).all()
    else:
        raise HTTPException(status_code=403, detail="Not authorized")

@router.post("/", response_model=TutorRequestResponse, status_code=status.HTTP_201_CREATED)
def create_request(request_in: TutorRequestCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    new_request = TutorRequest(
        **request_in.model_dump(),
        status=RequestStatus.OPEN,
        created_by=current_user.id
    )
    db.add(new_request)
    db.commit()
    db.refresh(new_request)

    # Notify all active tutors
    active_tutors = db.query(Tutor).filter(Tutor.status == "ACTIVE").all()
    for tutor in active_tutors:
        notif = Notification(
            user_id=tutor.user_id,
            title="New Tutoring Opportunity",
            message=f"A new request for {new_request.subject} is available."
        )
        db.add(notif)
    db.commit()

    return new_request

@router.get("/{request_id}", response_model=TutorRequestResponse)
def get_request(request_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    req = db.query(TutorRequest).filter(TutorRequest.id == request_id).first()
    if not req:
        raise HTTPException(status_code=404, detail="Request not found")
    return req

@router.patch("/{request_id}", response_model=TutorRequestResponse)
def update_request(request_id: int, update_in: TutorRequestUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    req = db.query(TutorRequest).filter(TutorRequest.id == request_id).first()
    if not req:
        raise HTTPException(status_code=404, detail="Request not found")
    
    req.status = update_in.status
    db.commit()
    db.refresh(req)
    return req
