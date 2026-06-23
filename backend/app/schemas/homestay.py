from pydantic import BaseModel


class Homestay(BaseModel):

    title: str
    location: str
    price: int