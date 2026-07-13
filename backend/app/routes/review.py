from fastapi import APIRouter, Depends, HTTPException

from app.core.dependencies import get_current_user
from app.core.supabase import supabase
from app.schemas.review import ReviewCreate

router = APIRouter(
    prefix="/reviews",
    tags=["Reviews"],
)


# ----------------------------
# Get reviews of a homestay
# ----------------------------
@router.get("/{homestay_id}")
def get_reviews(homestay_id: int):

    result = (
        supabase.table("reviews")
        .select("""
            id,
            rating,
            review,
            created_at,
            profiles!reviews_profile_fkey(
                full_name,
                avatar_url
            )
        """)
        .eq("homestay_id", homestay_id)
        .order("created_at", desc=True)
        .execute()
    )

    return result.data


# ----------------------------
# Add Review
# ----------------------------
@router.post("/")
def add_review(
    review: ReviewCreate,
    current_user=Depends(get_current_user),
):

    existing = (
        supabase.table("reviews")
        .select("id")
        .eq("user_id", current_user["sub"])
        .eq("homestay_id", review.homestay_id)
        .execute()
    )

    if existing.data:
        raise HTTPException(
            status_code=400,
            detail="You already reviewed this homestay."
        )

    result = (
        supabase.table("reviews")
        .insert({
            "user_id": current_user["sub"],
            "homestay_id": review.homestay_id,
            "rating": review.rating,
            "review": review.review,
        })
        .execute()
    )

    return {
        "success": True,
        "review": result.data
    }


# ----------------------------
# Delete Review
# ----------------------------
@router.delete("/{review_id}")
def delete_review(
    review_id: int,
    current_user=Depends(get_current_user),
):

    supabase.table("reviews")\
        .delete()\
        .eq("id", review_id)\
        .eq("user_id", current_user["sub"])\
        .execute()

    return {
        "success": True
    }