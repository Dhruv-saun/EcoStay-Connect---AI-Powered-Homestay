from fastapi import APIRouter

from app.core.supabase import supabase

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)

@router.get("/stats")
def get_admin_stats():

    users = supabase.table("users").select(
        "id",
        count="exact"
    ).execute()

    homestays = supabase.table("homestays").select(
        "id",
        count="exact"
    ).execute()

    bookings = supabase.table("bookings").select(
        "id",
        count="exact"
    ).execute()

    reviews = supabase.table("reviews").select(
        "id",
        count="exact"
    ).execute()

    # Revenue will be calculated later
    revenue = 0

    return {
        "users": users.count,
        "homestays": homestays.count,
        "bookings": bookings.count,
        "reviews": reviews.count,
        "revenue": revenue,
    }