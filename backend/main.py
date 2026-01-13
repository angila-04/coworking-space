from fastapi import FastAPI
from database import engine, Base
from routers.auth import router as auth_router
from routers import bookings
from routers.service_provider import router as sp_router


Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/")
def home():
    return {"status": "Backend running"}

app.include_router(auth_router)
app.include_router(sp_router)
app.include_router(bookings.router)
