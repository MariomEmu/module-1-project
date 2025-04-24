from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models
from database import engine, get_db
from pydantic import BaseModel
from datetime import date
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import desc
from datetime import datetime
from fastapi import status

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
models.Base.metadata.create_all(bind=engine)

# Exception handlers
@app.exception_handler(ValueError)
async def value_error_exception_handler(request, exc):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={"detail": str(exc)},
    )

@app.exception_handler(Exception)
async def generic_exception_handler(request, exc):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "Internal server error"},
    )

# Pydantic models
class JobCreate(BaseModel):
    position: str
    vacancy: str
    job_context: Optional[str] = None
    job_requirements: Optional[str] = None
    employment_status: str
    educational_requirements: Optional[str] = None
    additional_requirements: Optional[str] = None
    experience: Optional[str] = None
    salary: Optional[str] = None
    other_benefits: Optional[str] = None
    application_deadline: date
    department: str

    class Config:
        json_schema_extra = {
            "example": {
                "position": "Software Engineer",
                "vacancy": "2",
                "job_context": "We are looking for a skilled software engineer...",
                "job_requirements": "3+ years of experience with Python...",
                "employment_status": "Full-time",
                "educational_requirements": "Bachelor's degree in Computer Science",
                "additional_requirements": "Good communication skills",
                "experience": "3 years",
                "salary": "Competitive",
                "other_benefits": "Health insurance, flexible hours",
                "application_deadline": "2023-12-31",
                "department": "IT"
            }
        }

class JobResponse(BaseModel):
    job_id: int
    position: str
    vacancy: str
    job_context: Optional[str] = None
    job_requirements: Optional[str] = None
    employment_status: str
    educational_requirements: Optional[str] = None
    additional_requirements: Optional[str] = None
    experience: Optional[str] = None
    salary: Optional[str] = None
    other_benefits: Optional[str] = None
    application_deadline: date
    department: str
    created_at: datetime

    class Config:
        from_attributes = True

# Health check endpoint
@app.get("/", tags=["Health Check"])
def read_root():
    return {"message": "Job Posting API is working!"}

# Get all jobs
@app.get("/getjobs/", response_model=List[JobResponse], tags=["Jobs"])
def get_all_jobs(db: Session = Depends(get_db)):
    try:
        jobs = db.query(models.Job).order_by(desc(models.Job.created_at)).all()
        return jobs
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching jobs: {str(e)}"
        )

# Get single job by ID
@app.get("/getjobs/{job_id}", response_model=JobResponse, tags=["Jobs"])
def get_job(job_id: int, db: Session = Depends(get_db)):
    try:
        job = db.query(models.Job).filter(models.Job.job_id == job_id).first()
        if not job:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Job not found"
            )
        return job
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching job: {str(e)}"
        )

# Create new job
@app.post("/jobs/", 
          response_model=JobResponse, 
          status_code=status.HTTP_201_CREATED,
          tags=["Jobs"])
def create_job(job: JobCreate, db: Session = Depends(get_db)):
    try:
        new_job = models.Job(**job.dict())
        db.add(new_job)
        db.commit()
        db.refresh(new_job)
        return new_job
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating job: {str(e)}"
        )

# Update job
@app.put("/updatejobs/{job_id}", response_model=JobResponse, tags=["Jobs"])
def update_job(job_id: int, job: JobCreate, db: Session = Depends(get_db)):
    try:
        db_job = db.query(models.Job).filter(models.Job.job_id == job_id).first()
        if db_job is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Job not found"
            )

        for key, value in job.dict().items():
            setattr(db_job, key, value)

        db.commit()
        db.refresh(db_job)
        return db_job
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating job: {str(e)}"
        )

# Delete job
@app.delete("/Deletejobs/{job_id}", 
            response_model=dict,
            tags=["Jobs"])
def delete_job(job_id: int, db: Session = Depends(get_db)):
    try:
        db_job = db.query(models.Job).filter(models.Job.job_id == job_id).first()
        if db_job is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Job not found"
            )

        db.delete(db_job)
        db.commit()
        return {"message": "Job deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting job: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5500)