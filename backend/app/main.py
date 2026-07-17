from fastapi.exceptions import RequestValidationError

from app.core.error_handler import (
    validation_exception_handler,
    global_exception_handler
)
from app.core.exceptions import (
    NotFoundException,
    not_found_handler
)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.homestays import router
from app.routes.auth import router as auth_router
from app.routes.profile import router as profile_router
from app.routes.bookings import router as bookings_router
from app.core.limiter import limiter
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from app.routes.recommendation import router as recommendation_router
from app.routes.favorites import router as favorites_router
from app.routes.review import router as review_router
from app.routes.admin import router as admin_router
from app.routes.admin_users import router as admin_users_router
from app.routes.admin_homestays import router as admin_homestays_router
from app.routes.admin_bookings import router as admin_bookings_router
from app.routes.admin_reviews import router as admin_reviews_router
from app.routes.admin_analytics import router as admin_analytics_router
from app.routes.ai import router as ai_router

app = FastAPI(
    title="EcoStay Connect API",
    version="1.0.0"
)

app.state.limiter = limiter
app.add_exception_handler(
    RateLimitExceeded,
    _rate_limit_exceeded_handler,
)

app.add_exception_handler(
    RequestValidationError,
    validation_exception_handler
)

app.add_exception_handler(
    Exception,
    global_exception_handler
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
app.include_router(auth_router) 
app.include_router(profile_router)
app.include_router(bookings_router)
app.include_router(recommendation_router)
app.include_router(favorites_router)
app.include_router(review_router)
app.include_router(admin_router)
app.include_router(admin_users_router)
app.include_router(admin_homestays_router)
app.include_router(admin_bookings_router)
app.include_router(admin_reviews_router)
app.include_router(admin_analytics_router)
app.include_router(ai_router)

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