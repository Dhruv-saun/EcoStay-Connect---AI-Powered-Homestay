from app.core.exceptions import (
    NotFoundException,
    not_found_handler
)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.homestays import router


app = FastAPI(
    title="EcoStay Connect API",
    version="1.0.0"
)

app.add_exception_handler(
    NotFoundException,
    not_found_handler
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def home():

    return {
        "message": "EcoStay Backend Running"
    }


@app.get("/health")
def health():

    return {
        "status": "ok"
    }