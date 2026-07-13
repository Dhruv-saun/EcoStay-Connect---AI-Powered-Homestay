from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.core.supabase import supabase

router = APIRouter(
    prefix="/profile",
    tags=["Profile"],
)


@router.get("/me")
def get_profile(current_user=Depends(get_current_user)):
    result = (
        supabase.table("profiles")
        .select("*")
        .eq("id", current_user["sub"])
        .single()
        .execute()
    )

    return {
        **result.data,
        "email": current_user["email"]
    }