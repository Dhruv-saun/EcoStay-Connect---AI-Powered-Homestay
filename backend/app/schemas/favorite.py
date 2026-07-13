from pydantic import BaseModel


class FavoriteCreate(BaseModel):
    homestay_id: int