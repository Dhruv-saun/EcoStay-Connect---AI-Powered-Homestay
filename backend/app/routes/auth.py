from fastapi import APIRouter

from app.schemas.auth import RegisterRequest, LoginRequest
from app.services.auth_service import register_user, login_user
from app.core.dependencies import get_current_user
from fastapi import Depends
from fastapi import Request
from app.core.limiter import limiter

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post("/register", status_code=201)
@limiter.limit("5/15minutes")
def register(request: Request, payload: RegisterRequest):

    return register_user(
        email=payload.email,
        password=payload.password,
        full_name=payload.full_name,
    )


@router.post("/login")
@limiter.limit("5/15minutes")
def login(request: Request, payload: LoginRequest):

    return login_user(
        email=payload.email,
        password=payload.password,
    )
    
@router.get("/me")
def get_me(current_user=Depends(get_current_user)):
    return {
        "success": True,
        "user": current_user
    }