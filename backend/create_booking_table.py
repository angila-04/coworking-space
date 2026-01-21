from database import engine  # your SQLAlchemy engine
from models import Booking  # import Booking model

# ---------------- DROP OLD TABLE ----------------
Booking.__table__.drop(bind=engine, checkfirst=True)  # checkfirst=True prevents error if table doesn't exist

# ---------------- CREATE NEW TABLE ----------------
Booking.__table__.create(bind=engine)

print("Booking table created successfully!")
