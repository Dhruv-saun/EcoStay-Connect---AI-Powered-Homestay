from fastapi import APIRouter

from app.schemas.recommendation import RecommendationRequest
from app.ai.recommendation import get_recommendations

router = APIRouter(
    prefix="/recommendations",
    tags=["AI Recommendations"]
)


@router.post("/")
def recommend(payload: RecommendationRequest):

    recommendations = get_recommendations(
        payload.max_price,
        payload.guests,
        payload.location
    )

    return {
        "success": True,
        "recommendations": recommendations
    }