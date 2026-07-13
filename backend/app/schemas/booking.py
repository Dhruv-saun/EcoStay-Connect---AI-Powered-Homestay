from pydantic import BaseModel
from datetime import date


class BookingCreate(BaseModel):
    homestay_id: int
    guests: int
    checkin: date
    checkout: date
    requests: str = ""