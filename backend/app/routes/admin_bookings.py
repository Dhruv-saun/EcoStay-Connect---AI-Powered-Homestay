from fastapi import APIRouter
from app.core.supabase import supabase

router = APIRouter(prefix="/admin/bookings", tags=["Admin Bookings"])


@router.get("/")
def get_bookings():
    result = (
        supabase.table("bookings")
        .select("*")
        .order("id")
        .execute()
    )

    return result.data


@router.put("/{booking_id}")
def update_booking_status(
    booking_id: int,
    body: dict
):
    result = (
        supabase.table("bookings")
        .update(
            {
                "status": body["status"]
            }
        )
        .eq("id", booking_id)
        .execute()
    )

    return {
        "success": True,
        "booking": result.data
    }


@router.delete("/{booking_id}")
def delete_booking(booking_id: int):
    (
        supabase.table("bookings")
        .delete()
        .eq("id", booking_id)
        .execute()
    )

    return {
        "success": True,
        "message": "Booking deleted"
    }