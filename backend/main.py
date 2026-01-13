from fastapi import FastAPI
from database import engine, Base
from routers.auth import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/")
def home():
    return {"status": "Backend running"}

app.include_router(auth_router)

