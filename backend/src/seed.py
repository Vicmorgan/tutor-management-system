import os
import sys
from dotenv import load_dotenv

# Ensure we can import from src
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
load_dotenv()

from sqlalchemy.orm import Session
from src.database import SessionLocal, engine, Base
from src.models import User, Tutor, Student, TutorRequest, Application, Assignment, Schedule, Notification
from src.models import UserRole, RequestStatus, ApplicationStatus, TutorStatus, StudentStatus
from src.auth import get_password_hash
import datetime

def seed_database():
    db: Session = SessionLocal()

    # 1. Create Admin
    admin = db.query(User).filter_by(email="admin@eduteach.com").first()
    if not admin:
        admin = User(
            email="admin@eduteach.com",
            password_hash=get_password_hash("Admin1234!"),
            full_name="Alex Rivera",
            role=UserRole.ADMIN
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)

    # 2. Create Tutor
    tutor_user = db.query(User).filter_by(email="tutor@eduteach.com").first()
    if not tutor_user:
        tutor_user = User(
            email="tutor@eduteach.com",
            password_hash=get_password_hash("Tutor1234!"),
            full_name="Prof. Sarah Mitchell",
            role=UserRole.TUTOR
        )
        db.add(tutor_user)
        db.commit()
        db.refresh(tutor_user)

        tutor_profile = Tutor(user_id=tutor_user.id, rating=4.9, status=TutorStatus.ACTIVE)
        db.add(tutor_profile)
        db.commit()
        db.refresh(tutor_profile)
    else:
        tutor_profile = tutor_user.tutor_profile

    # 3. Create Student
    student_user = db.query(User).filter_by(email="student@eduteach.com").first()
    if not student_user:
        student_user = User(
            email="student@eduteach.com",
            password_hash=get_password_hash("Student1234!"),
            full_name="Alex Johnson",
            role=UserRole.STUDENT
        )
        db.add(student_user)
        db.commit()
        db.refresh(student_user)

        student_profile = Student(user_id=student_user.id, parent_name="Mr. Johnson", parent_phone="+1234567890", status=StudentStatus.ACTIVE)
        db.add(student_profile)
        db.commit()
        db.refresh(student_profile)
    else:
        student_profile = student_user.student_profile



    print("Seed data successfully injected!")
    db.close()

if __name__ == "__main__":
    seed_database()
