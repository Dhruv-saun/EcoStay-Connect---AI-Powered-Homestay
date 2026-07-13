from fastapi import APIRouter

from app.core.supabase import supabase

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)


@router.get("/users")
def get_all_users():

    users = (
        supabase.table("profiles")
        .select(
            """
            id,
            full_name,
            city,
            phone,
            avatar_url,
            is_admin
            """
        )
        .order("full_name")
        .execute()
    )

    return users.data