from fastapi import APIRouter, HTTPException

from app.schemas.ai import AIRequest, AIResponse
from app.ai.gemini import generate_travel_plan

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


@router.post("/travel-planner", response_model=AIResponse)
def travel_planner(data: AIRequest):

    try:
        answer = generate_travel_plan(data.prompt)

        return AIResponse(response=answer)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )