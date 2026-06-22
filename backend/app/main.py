from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="EcoStay Connect API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

homestays = [
    {
        "id": 1,
        "title": "Mountain View Cottage",
        "location": "Mussoorie",
        "price": 2500
    },
    {
        "id": 2,
        "title": "Forest Eco Retreat",
        "location": "Rishikesh",
        "price": 3200
    },
    {
        "id": 3,
        "title": "Lake Side Homestay",
        "location": "Nainital",
        "price": 2800
    }
]


@app.get("/")
def home():
    return {
        "message": "EcoStay Backend Running"
    }


@app.get("/health")
def health():
    return {
        "status": "ok"
    }


# GET ALL
@app.get("/homestays")
def get_homestays():
    return homestays


# SEARCH (must come before {stay_id})
@app.get("/homestays/search")
def search_homestays(location: str):

    results = []

    for stay in homestays:

        if location.lower() in stay["location"].lower():
            results.append(stay)

    return {
        "count": len(results),
        "results": results
    }


# GET ONE
@app.get("/homestays/{stay_id}")
def get_single_homestay(stay_id: int):

    for stay in homestays:

        if stay["id"] == stay_id:
            return stay

    return {
        "error": "Homestay not found"
    }


# CREATE
@app.post("/homestays")
def create_homestay(stay: dict):

    stay["id"] = len(homestays) + 1

    homestays.append(stay)

    return {
        "message": "Homestay created",
        "data": stay
    }


# UPDATE
@app.put("/homestays/{stay_id}")
def update_homestay(
    stay_id: int,
    updated_data: dict
):

    for stay in homestays:

        if stay["id"] == stay_id:

            stay.update(updated_data)

            return {
                "message": "Homestay updated",
                "data": stay
            }

    return {
        "error": "Homestay not found"
    }


# DELETE
@app.delete("/homestays/{stay_id}")
def delete_homestay(stay_id: int):

    for index, stay in enumerate(homestays):

        if stay["id"] == stay_id:

            deleted = homestays.pop(index)

            return {
                "message": "Homestay deleted",
                "data": deleted
            }

    return {
        "error": "Homestay not found"
    }