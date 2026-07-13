from pydantic import BaseModel


class RecommendationRequest(BaseModel):
    max_price: int
    guests: int
    location: str | None = None