from database import engine
from models import Space

# Drop table
Space.__table__.drop(bind=engine, checkfirst=True)

# Recreate table
Space.__table__.create(bind=engine)

print("Spaces table recreated successfully")
