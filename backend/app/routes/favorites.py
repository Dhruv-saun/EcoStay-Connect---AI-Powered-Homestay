from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user
from app.core.supabase import supabase
from app.schemas.favorite import FavoriteCreate

router = APIRouter(
    prefix="/favorites",
    tags=["Favorites"],
)


# Get all favorites
@router.get("/")
def get_favorites(current_user=Depends(get_current_user)):
    result = (
        supabase.table("favorites")
        .select("""
            id,
            homestays(
                id,
                title,
                location,
                price,
                image_url,
                eco_score,
                wifi,
                parking,
                breakfast,
                pet_friendly
            )
        """)
        .eq("user_id", current_user["sub"])
        .execute()
    )

    return result.data


# Add favorite
@router.post("/")
def add_favorite(
    favorite: FavoriteCreate,
    current_user=Depends(get_current_user),
):
    print("Current user:", current_user)

    try:
        result = (
            supabase.table("favorites")
            .insert({
                "user_id": current_user["sub"],
                "homestay_id": favorite.homestay_id,
            })
            .execute()
        )

        print(result)

        return {
            "success": True,
            "favorite": result.data,
        }

    except Exception as e:
        print("FULL ERROR:")
        print(type(e))
        print(e)

        raise

# Remove favorite
@router.delete("/{homestay_id}")
def remove_favorite(
    homestay_id: int,
    current_user=Depends(get_current_user),
):
    supabase.table("favorites")\
        .delete()\
        .eq("user_id", current_user["sub"])\
        .eq("homestay_id", homestay_id)\
        .execute()

    return {
        "success": True,
        "message": "Removed from favorites."
    }