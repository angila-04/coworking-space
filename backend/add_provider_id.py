# add_provider_id.py
from sqlalchemy import MetaData, Table, text
from database import engine  # your SQLAlchemy engine

# ---------- Reflect the existing table ----------
metadata = MetaData()
spaces_table = Table("spaces", metadata, autoload_with=engine)

# ---------- Add provider_id column ----------
with engine.connect() as conn:
    conn.execute(text("ALTER TABLE spaces ADD COLUMN provider_id INTEGER"))
    conn.commit()

print("provider_id column added to spaces table successfully!")
