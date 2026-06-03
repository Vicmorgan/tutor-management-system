from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import Session as SessionModel, User, UserRole
from ..schemas import SessionResponse, SessionCreate
from ..auth import get_current_user

router = APIRouter(prefix="/api/sessions", tags=["sessions"])

@router.get("/", response_model=List[SessionResponse])
def get_sessions(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(SessionModel).all()

@router.post("/", response_model=SessionResponse, status_code=status.HTTP_201_CREATED)
def create_session(session_in: SessionCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    new_session = SessionModel(
        course_id=session_in.course_id,
        start_time=session_in.start_time,
        end_time=session_in.end_time,
        virtual_link=session_in.virtual_link
    )
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return new_session

@router.delete("/{session_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_session(session_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    session_to_delete = db.query(SessionModel).filter(SessionModel.id == session_id).first()
    if not session_to_delete:
        raise HTTPException(status_code=404, detail="Session not found")
        
    db.delete(session_to_delete)
    db.commit()
    return None
