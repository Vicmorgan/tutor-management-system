from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from decimal import Decimal
from .models import UserRole

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

    class Config:
        from_attributes = True
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class CourseBase(BaseModel):
    title: str
    description: Optional[str] = None
    price: Decimal
    department: Optional[str] = None

class CourseResponse(CourseBase):
    id: int
    tutor_id: Optional[int]
    
    class Config:
        from_attributes = True
        orm_mode = True

class SessionCreate(BaseModel):
    course_id: int
    start_time: datetime
    end_time: datetime
    virtual_link: Optional[str] = None

class SessionResponse(BaseModel):
    id: int
    course_id: int
    start_time: datetime
    end_time: datetime
    virtual_link: Optional[str] = None
    
    class Config:
        from_attributes = True
        orm_mode = True

class PaymentResponse(BaseModel):
    id: int
    student_id: int
    course_id: int
    amount: Decimal
    status: str
    due_date: datetime
    paid_at: Optional[datetime] = None

    class Config:
        from_attributes = True
        orm_mode = True
