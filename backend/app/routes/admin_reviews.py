from fastapi import APIRouter
from app.core.supabase import supabase

router = APIRouter(
    prefix="/admin/reviews",
    tags=["Admin Reviews"]
)


@router.get("/")
def get_reviews():
    result = (
        supabase.table("reviews")
        .select("*")
        .order("id")
        .execute()
    )

    return result.data


@router.delete("/{review_id}")
def delete_review(review_id: int):
    (
        supabase.table("reviews")
        .delete()
        .eq("id", review_id)
        .execute()
    )

    return {
        "success": True,
        "message": "Review deleted"
    }