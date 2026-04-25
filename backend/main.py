from fastapi import FastAPI
import models
from database import engine
from routes import items, requests, users
from routes import auth_routes
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Inventory Supply Tracker")

origins = [
    "http://localhost:3000",
    "https://*.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(items.router)
app.include_router(requests.router)
app.include_router(users.router)
app.include_router(auth_routes.router)

@app.get("/")
def root():
    return {"message": "API is running"}