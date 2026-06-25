from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from .database import get_db
from .models import User
from .schemas import UserCreate, UserResponse, Token
from .auth import get_password_hash, verify_password, create_access_token, get_current_user

from .routers import users, requests, applications, assignments, notifications

app = FastAPI(title="TutorMatch API", version="1.0.0")

app.include_router(users.router)
app.include_router(requests.router)
app.include_router(applications.router)
app.include_router(assignments.router)
app.include_router(notifications.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/auth/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user.email, "role": user.role.value})
    return {"access_token": access_token, "token_type": "bearer"}

from pydantic import BaseModel, EmailStr
from .models import UserRole, Tutor, TutorStatus

class RegisterUser(BaseModel):
    full_name: str
    email: EmailStr
    password: str

@app.post("/api/auth/register", response_model=Token, status_code=status.HTTP_201_CREATED)
def register(user_in: RegisterUser, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user_in.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(
        email=user_in.email,
        password_hash=get_password_hash(user_in.password),
        full_name=user_in.full_name,
        role=UserRole.TUTOR
    )
    db.add(new_user)
    db.flush()

    # Initialize tutor profile as PENDING
    new_tutor_profile = Tutor(user_id=new_user.id, rating=0.0, status=TutorStatus.PENDING)
    db.add(new_tutor_profile)
    db.commit()
    db.refresh(new_user)
    
    access_token = create_access_token(data={"sub": new_user.email, "role": new_user.role.value})
    return {"access_token": access_token, "token_type": "bearer"}

from .schemas import UserCreate, UserResponse, Token, TutorResponse, StudentResponse
from typing import Union

@app.get("/api/auth/me", response_model=Union[TutorResponse, StudentResponse, UserResponse])
def get_me(current_user: User = Depends(get_current_user)):
    return current_user

@app.get("/")
def read_root():
    return {"message": "Welcome to TutorMatch API"}
