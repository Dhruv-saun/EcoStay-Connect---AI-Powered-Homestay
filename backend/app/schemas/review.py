from pydantic import BaseModel, Field


class ReviewCreate(BaseModel):
    homestay_id: int
    rating: int = Field(ge=1, le=5)
    review: str