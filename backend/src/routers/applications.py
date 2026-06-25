from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import Application, TutorRequest, User, UserRole, ApplicationStatus, Notification, RequestStatus
from ..schemas import ApplicationResponse, ApplicationCreate, ApplicationUpdate
from ..auth import get_current_user

router = APIRouter(prefix="/api/applications", tags=["applications"])

@router.get("/", response_model=List[ApplicationResponse])
def get_all_applications(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Not authorized")
    return db.query(Application).order_by(Application.applied_at.desc()).all()

@router.get("/my", response_model=List[ApplicationResponse])
def get_my_applications(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.TUTOR or not current_user.tutor_profile:
        raise HTTPException(status_code=403, detail="Not authorized")
    return db.query(Application).filter(Application.tutor_id == current_user.tutor_profile.id).all()

@router.get("/request/{request_id}", response_model=List[ApplicationResponse])
def get_request_applications(request_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Not authorized")
    return db.query(Application).filter(Application.request_id == request_id).all()

@router.post("/", response_model=ApplicationResponse, status_code=status.HTTP_201_CREATED)
def apply_to_request(app_in: ApplicationCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.TUTOR or not current_user.tutor_profile:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    req = db.query(TutorRequest).filter(TutorRequest.id == app_in.request_id).first()
    if not req or req.status != RequestStatus.OPEN:
        raise HTTPException(status_code=400, detail="Request is not open for applications")

    existing_app = db.query(Application).filter(
        Application.request_id == app_in.request_id,
        Application.tutor_id == current_user.tutor_profile.id
    ).first()
    if existing_app:
        raise HTTPException(status_code=400, detail="Already applied to this request")
    
    new_app = Application(
        request_id=app_in.request_id,
        tutor_id=current_user.tutor_profile.id,
        status=ApplicationStatus.PENDING
    )
    db.add(new_app)
    db.commit()
    db.refresh(new_app)
    return new_app

@router.patch("/{app_id}", response_model=ApplicationResponse)
def update_application_status(app_id: int, update_in: ApplicationUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    app = db.query(Application).filter(Application.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    
    app.status = update_in.status
    db.commit()
    db.refresh(app)

    # Notify tutor
    notif = Notification(
        user_id=app.tutor.user_id,
        title="Application Update",
        message=f"Your application for '{app.request.subject}' has been {app.status.value.lower()}."
    )
    db.add(notif)
    db.commit()

    return app
