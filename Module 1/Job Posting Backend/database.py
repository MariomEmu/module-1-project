from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.exc import OperationalError
import time

DATABASE_URL = "mysql+mysqlconnector://root:16016016@localhost/newjobposting"

# Add connection retry logic
max_retries = 3
retry_count = 0
while retry_count < max_retries:
    try:
        engine = create_engine(
            DATABASE_URL,
            pool_pre_ping=True,
            pool_recycle=3600,
            connect_args={
                "connect_timeout": 10
            }
        )
        # Test the connection
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
            connection.commit()
        break
    except OperationalError as e:
        retry_count += 1
        if retry_count == max_retries:
            raise Exception(f"Failed to connect to database after {max_retries} attempts: {str(e)}")
        print(f"Database connection attempt {retry_count} failed. Retrying in 2 seconds...")
        time.sleep(2)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()