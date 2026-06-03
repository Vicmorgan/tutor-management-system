import os
import sys
from dotenv import load_dotenv

# Ensure we can import from src
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
load_dotenv()

from sqlalchemy.orm import Session
from src.database import SessionLocal, engine, Base
from src.models import User, Course, Enrollment, Session as ClassSession, Attendance, Assignment, Payment
from src.models import UserRole, PaymentStatus, EnrollmentStatus, AttendanceStatus
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

    # 2. Create Tutor
    tutor = db.query(User).filter_by(email="tutor@eduteach.com").first()
    if not tutor:
        tutor = User(
            email="tutor@eduteach.com",
            password_hash=get_password_hash("Tutor1234!"),
            full_name="Prof. Sarah Mitchell",
            role=UserRole.TUTOR
        )
        db.add(tutor)

    # 3. Create Student
    student = db.query(User).filter_by(email="student@eduteach.com").first()
    if not student:
        student = User(
            email="student@eduteach.com",
            password_hash=get_password_hash("Student1234!"),
            full_name="Alex Johnson",
            role=UserRole.STUDENT
        )
        db.add(student)
        
    db.commit()

    print("Checking for existing courses...")
    # 4. Create Course
    course = db.query(Course).filter_by(title="Advanced Mathematics").first()
    if not course:
        print("Creating course...")
        course = Course(
            title="Advanced Mathematics",
            description="High school level advanced math covering Calculus and Trigonometry.",
            price=299.99,
            department="Mathematics",
            tutor_id=tutor.id
        )
        db.add(course)
        db.commit()

    # 5. Create Enrollment
    enrollment = db.query(Enrollment).filter_by(student_id=student.id, course_id=course.id).first()
    if not enrollment:
        enrollment = Enrollment(
            student_id=student.id,
            course_id=course.id,
            status=EnrollmentStatus.ACTIVE
        )
        db.add(enrollment)
        
        payment = Payment(
            student_id=student.id,
            course_id=course.id,
            amount=299.99,
            status=PaymentStatus.PAID,
            due_date=datetime.datetime.now(),
            paid_at=datetime.datetime.now()
        )
        db.add(payment)
        db.commit()

    print("Seed data successfully injected!")
    db.close()

if __name__ == "__main__":
    seed_database()
