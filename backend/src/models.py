from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Enum, Numeric, Text, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from .database import Base

class UserRole(str, enum.Enum):
    ADMIN = "ADMIN"
    TUTOR = "TUTOR"
    STUDENT = "STUDENT"

class RequestStatus(str, enum.Enum):
    DRAFT = "DRAFT"
    OPEN = "OPEN"
    FILLED = "FILLED"
    CLOSED = "CLOSED"

class ApplicationStatus(str, enum.Enum):
    PENDING = "PENDING"
    ACCEPTED = "ACCEPTED"
    REJECTED = "REJECTED"

class TutorStatus(str, enum.Enum):
    PENDING = "PENDING"
    ACTIVE = "ACTIVE"
    SUSPENDED = "SUSPENDED"
    ON_LEAVE = "ON_LEAVE"

class StudentStatus(str, enum.Enum):
    ACTIVE = "ACTIVE"
    SUSPENDED = "SUSPENDED"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Roles specific models
    tutor_profile = relationship("Tutor", back_populates="user", uselist=False, cascade="all, delete-orphan")
    student_profile = relationship("Student", back_populates="user", uselist=False, cascade="all, delete-orphan")

    # Relationships
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan")

class Tutor(Base):
    __tablename__ = "tutors"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    rating = Column(Float, default=0.0)
    status = Column(Enum(TutorStatus), default=TutorStatus.ACTIVE)

    user = relationship("User", back_populates="tutor_profile")
    applications = relationship("Application", back_populates="tutor", cascade="all, delete-orphan")
    assignments = relationship("Assignment", back_populates="tutor", cascade="all, delete-orphan")

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    parent_name = Column(String(255), nullable=True)
    parent_phone = Column(String(50), nullable=True)
    status = Column(Enum(StudentStatus), default=StudentStatus.ACTIVE)

    user = relationship("User", back_populates="student_profile")
    requests = relationship("TutorRequest", back_populates="student", cascade="all, delete-orphan")
    assignments = relationship("Assignment", back_populates="student", cascade="all, delete-orphan")

class TutorRequest(Base):
    __tablename__ = "tutor_requests"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    subject = Column(String(255), nullable=False)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), nullable=False)
    student_level = Column(String(100), nullable=True)
    salary = Column(Numeric(10, 2), nullable=False)
    mode = Column(String(50), nullable=False) # e.g., "Physical", "Online"
    location = Column(String(255), nullable=True)
    days_of_week = Column(String(255), nullable=True) # e.g., "Mon, Wed"
    time = Column(String(100), nullable=True) # e.g., "10:00 AM"
    duration = Column(String(50), nullable=True) # e.g., "2 hours"
    start_date = Column(DateTime(timezone=True), nullable=True)
    notes = Column(Text, nullable=True)
    status = Column(Enum(RequestStatus), default=RequestStatus.OPEN)
    created_by = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    student = relationship("Student", back_populates="requests")
    admin_creator = relationship("User", foreign_keys=[created_by])
    applications = relationship("Application", back_populates="request", cascade="all, delete-orphan")
    assignments = relationship("Assignment", back_populates="request", cascade="all, delete-orphan")

class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    request_id = Column(Integer, ForeignKey("tutor_requests.id", ondelete="CASCADE"), nullable=False)
    tutor_id = Column(Integer, ForeignKey("tutors.id", ondelete="CASCADE"), nullable=False)
    status = Column(Enum(ApplicationStatus), default=ApplicationStatus.PENDING)
    applied_at = Column(DateTime(timezone=True), server_default=func.now())

    request = relationship("TutorRequest", back_populates="applications")
    tutor = relationship("Tutor", back_populates="applications")

class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(Integer, primary_key=True, index=True)
    request_id = Column(Integer, ForeignKey("tutor_requests.id", ondelete="CASCADE"), nullable=False)
    tutor_id = Column(Integer, ForeignKey("tutors.id", ondelete="CASCADE"), nullable=False)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), nullable=False)
    assigned_at = Column(DateTime(timezone=True), server_default=func.now())

    request = relationship("TutorRequest", back_populates="assignments")
    tutor = relationship("Tutor", back_populates="assignments")
    student = relationship("Student", back_populates="assignments")
    schedules = relationship("Schedule", back_populates="assignment", cascade="all, delete-orphan")

class Schedule(Base):
    __tablename__ = "schedules"

    id = Column(Integer, primary_key=True, index=True)
    assignment_id = Column(Integer, ForeignKey("assignments.id", ondelete="CASCADE"), nullable=False)
    day_of_week = Column(String(50), nullable=False) # e.g. "Monday"
    time = Column(String(100), nullable=False) # e.g. "10:00 AM"
    duration = Column(String(50), nullable=True)

    assignment = relationship("Assignment", back_populates="schedules")

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="notifications")
