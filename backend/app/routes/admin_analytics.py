from fastapi import APIRouter
from app.core.supabase import supabase

router = APIRouter(
    prefix="/admin/analytics",
    tags=["Admin Analytics"]
)


@router.get("/")
def get_dashboard():

    users = (
        supabase.table("profiles")
        .select("*", count="exact")
        .execute()
    )

    homestays = (
        supabase.table("homestays")
        .select("*", count="exact")
        .execute()
    )

    bookings = (
        supabase.table("bookings")
        .select("*", count="exact")
        .execute()
    )

    reviews = (
        supabase.table("reviews")
        .select("*", count="exact")
        .execute()
    )

    confirmed = (
        supabase.table("bookings")
        .select("*", count="exact")
        .eq("status", "Confirmed")
        .execute()
    )

    pending = (
        supabase.table("bookings")
        .select("*", count="exact")
        .eq("status", "Pending")
        .execute()
    )

    cancelled = (
        supabase.table("bookings")
        .select("*", count="exact")
        .eq("status", "Cancelled")
        .execute()
    )

    return {
        "users": users.count,
        "homestays": homestays.count,
        "bookings": bookings.count,
        "reviews": reviews.count,
        "confirmed": confirmed.count,
        "pending": pending.count,
        "cancelled": cancelled.count,
    }