from pydantic import BaseModel, EmailStr, confloat
from typing import Optional, List
from datetime import datetime
from decimal import Decimal
from .models import UserRole, RequestStatus, ApplicationStatus, TutorStatus, StudentStatus

# --- Users ---

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: UserRole

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: UserRole
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

# --- Tutors & Students ---

class TutorProfileResponse(BaseModel):
    id: int
    user_id: int
    rating: float
    status: TutorStatus

    class Config:
        from_attributes = True

class StudentProfileResponse(BaseModel):
    id: int
    user_id: int
    parent_name: Optional[str] = None
    parent_phone: Optional[str] = None
    status: StudentStatus

    class Config:
        from_attributes = True

class TutorResponse(UserResponse):
    tutor_profile: Optional[TutorProfileResponse] = None

class StudentResponse(UserResponse):
    student_profile: Optional[StudentProfileResponse] = None

class StudentCreate(UserCreate):
    parent_name: Optional[str] = None
    parent_phone: Optional[str] = None

class TutorCreate(UserCreate):
    pass # Role is handled

class StudentUpdate(BaseModel):
    parent_name: Optional[str] = None
    parent_phone: Optional[str] = None
    status: Optional[StudentStatus] = None

class TutorUpdate(BaseModel):
    rating: Optional[float] = None
    status: Optional[TutorStatus] = None

# --- Tutor Requests ---

class TutorRequestBase(BaseModel):
    title: str
    subject: str
    student_id: int
    student_level: Optional[str] = None
    salary: Decimal
    mode: str
    location: Optional[str] = None
    days_of_week: Optional[str] = None
    time: Optional[str] = None
    duration: Optional[str] = None
    start_date: Optional[datetime] = None
    notes: Optional[str] = None

class TutorRequestCreate(TutorRequestBase):
    pass

class TutorRequestUpdate(BaseModel):
    status: RequestStatus

class TutorRequestResponse(TutorRequestBase):
    id: int
    status: RequestStatus
    created_by: Optional[int] = None
    created_at: datetime
    student: Optional[StudentProfileResponse] = None

    class Config:
        from_attributes = True

# --- Applications ---

class ApplicationCreate(BaseModel):
    request_id: int

class ApplicationUpdate(BaseModel):
    status: ApplicationStatus

class ApplicationResponse(BaseModel):
    id: int
    request_id: int
    tutor_id: int
    status: ApplicationStatus
    applied_at: datetime
    tutor: Optional[TutorProfileResponse] = None

    class Config:
        from_attributes = True

# --- Assignments & Schedules ---

class ScheduleBase(BaseModel):
    day_of_week: str
    time: str
    duration: Optional[str] = None

class ScheduleResponse(ScheduleBase):
    id: int
    assignment_id: int

    class Config:
        from_attributes = True

class AssignmentCreate(BaseModel):
    request_id: int
    tutor_id: int
    student_id: int

class AssignmentResponse(BaseModel):
    id: int
    request_id: int
    tutor_id: int
    student_id: int
    assigned_at: datetime
    request: Optional[TutorRequestResponse] = None
    schedules: List[ScheduleResponse] = []

    class Config:
        from_attributes = True

# --- Notifications ---

class NotificationCreate(BaseModel):
    user_id: int
    title: str
    message: str

class NotificationResponse(BaseModel):
    id: int
    user_id: int
    title: str
    message: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True
