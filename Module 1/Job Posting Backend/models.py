from sqlalchemy import Column, Integer, String, Text, Date, DateTime, func
from database import Base

class Job(Base):
    __tablename__ = "jobs"

    job_id = Column(Integer, primary_key=True, autoincrement=True)
    position = Column(String(255), nullable=False)
    vacancy = Column(Text)
    job_context = Column(Text)
    job_requirements = Column(Text)
    employment_status = Column(Text)
    educational_requirements = Column(Text)
    additional_requirements = Column(Text)
    experience = Column(Text)
    salary = Column(Text)
    other_benefits = Column(Text)
    application_deadline = Column(Date)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    department = Column(Text)