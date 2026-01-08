from fastapi import FastAPI
from routers import auth

app = FastAPI(title="Coworking Space API")

# Include Auth router
app.include_router(auth.router)

@app.get("/")
def root():
    return {"message": "Backend running successfully"}
