from fastapi import APIRouter, Depends, HTTPException
from datetime import date

from app.core.dependencies import get_current_user
from app.core.supabase import supabase
from app.schemas.booking import BookingCreate

router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"],
)


@router.get("/")
def get_my_bookings(current_user=Depends(get_current_user)):
    result = (
        supabase.table("bookings")
        .select("""
            id,
            status,
            guests,
            checkin,
            checkout,
            requests,
            created_at,
            homestays(
                title,
                location,
                price,
                image_url
            )
        """)
        .eq("user_id", current_user["sub"])
        .order("created_at", desc=True)
        .execute()
    )

    return result.data

@router.post("/")
def create_booking(
    booking: BookingCreate,
    current_user=Depends(get_current_user),
):
        # Check dates

    if booking.checkin >= booking.checkout:
        raise HTTPException(
            status_code=400,
            detail="Check-out date must be after check-in date."
        )

    # Check today's date

    if booking.checkin < date.today():
        raise HTTPException(
            status_code=400,
            detail="Check-in cannot be in the past."
        )

    # Check guests

    if booking.guests < 1:
        raise HTTPException(
            status_code=400,
            detail="Guests must be at least 1."
        )
    profile = (
        supabase.table("profiles")
        .select("full_name")
        .eq("id", current_user["sub"])
        .single()
        .execute()
    )
    
        # Check for conflicting bookings
    existing = (
        supabase.table("bookings")
        .select("*")
        .eq("homestay_id", booking.homestay_id)
        .neq("status", "Cancelled")
        .execute()
    )

    for booked in existing.data or []:
        existing_checkin = date.fromisoformat(booked["checkin"])
        existing_checkout = date.fromisoformat(booked["checkout"])

        # Check if date ranges overlap
        if (
            booking.checkin < existing_checkout
            and booking.checkout > existing_checkin
        ):
            raise HTTPException(
                status_code=400,
                detail="This homestay is already booked for the selected dates."
            )

    result = (
        supabase.table("bookings")
        .insert({
            "name": profile.data["full_name"],
            "email": current_user["email"],
            "guests": booking.guests,
            "checkin": str(booking.checkin),
            "checkout": str(booking.checkout),
            "requests": booking.requests,
            "homestay_id": booking.homestay_id,
            "user_id": current_user["sub"],
            "status": "Confirmed",
        })
        .execute()
    )

    return {
        "success": True,
        "booking": result.data,
    }

@router.put("/{booking_id}/cancel")
def cancel_booking(
    booking_id: int,
    current_user=Depends(get_current_user),
):
    result = (
        supabase.table("bookings")
        .update({"status": "Cancelled"})
        .eq("id", booking_id)
        .eq("user_id", current_user["sub"])
        .execute()
    )

    print("BOOKING ID:", booking_id)
    print("USER ID:", current_user["sub"])
    print("UPDATED:", result.data)

    return {
        "success": True,
        "message": "Booking cancelled successfully.",
        "data": result.data
    }