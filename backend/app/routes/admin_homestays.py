from fastapi import APIRouter
from app.core.supabase import supabase
from pydantic import BaseModel

router = APIRouter(
    prefix="/admin/homestays",
    tags=["Admin Homestays"],
)

class HomestayCreate(BaseModel):
    title: str
    location: str
    price: int
    eco_score: int
    image_url: str = ""

# Get all homestays
@router.get("/")
def get_homestays():

    result = (
        supabase.table("homestays")
        .select("*")
        .order("id")
        .execute()
    )

    return result.data

@router.post("/")
def create_homestay(payload: HomestayCreate):

    result = (
        supabase.table("homestays")
        .insert({
            "title": payload.title,
            "location": payload.location,
            "price": payload.price,
            "eco_score": payload.eco_score,
            "image_url": payload.image_url,
        })
        .execute()
    )

    return {
        "success": True,
        "homestay": result.data
    }

@router.put("/{homestay_id}")
def update_homestay(homestay_id: int, payload: HomestayCreate):

    result = (
        supabase.table("homestays")
        .update({
            "title": payload.title,
            "location": payload.location,
            "price": payload.price,
            "eco_score": payload.eco_score,
            "image_url": payload.image_url,
        })
        .eq("id", homestay_id)
        .execute()
    )

    return {
        "success": True,
        "data": result.data
    }

# Delete homestay
@router.delete("/{homestay_id}")
def delete_homestay(homestay_id: int):

    supabase.table("homestays")\
        .delete()\
        .eq("id", homestay_id)\
        .execute()

    return {
        "success": True
    }