
from fastapi import (
    APIRouter,
    HTTPException,
    status
)

from app.services.homestay_service import (
    get_all
)

router = APIRouter()


# GET ALL

@router.get(
    "/homestays",
    status_code=200
)
def get_homestays():

    return get_all()


# SEARCH (IMPORTANT → ABOVE stay_id)

@router.get(
    "/homestays/search",
    status_code=200
)
def search_homestays(
    location: str
):

    stays = get_all()

    results = []

    for stay in stays:

        if (
            location.lower()
            in stay["location"].lower()
        ):

            results.append(stay)

    return {
        "count": len(results),
        "results": results
    }


# GET SINGLE

@router.get(
    "/homestays/{stay_id}",
    status_code=200
)
def get_single_homestay(
    stay_id: int
):

    stays = get_all()

    for stay in stays:

        if stay["id"] == stay_id:
            return stay

    raise HTTPException(
        status_code=404,
        detail="Homestay not found"
    )


# CREATE

@router.post(
    "/homestays",
    status_code=201
)
def create_homestay(
    stay: dict
):

    stays = get_all()

    stay["id"] = len(stays) + 1

    stays.append(stay)

    return {
        "success": True,
        "data": stay
    }


# UPDATE

@router.put(
    "/homestays/{stay_id}",
    status_code=200
)
def update_homestay(
    stay_id: int,
    updated_data: dict
):

    stays = get_all()

    for stay in stays:

        if stay["id"] == stay_id:

            stay.update(updated_data)

            return {
                "success": True,
                "data": stay
            }

    raise HTTPException(
        status_code=404,
        detail="Homestay not found"
    )


# DELETE

@router.delete(
    "/homestays/{stay_id}",
    status_code=200
)
def delete_homestay(
    stay_id: int
):

    stays = get_all()

    for i, stay in enumerate(stays):

        if stay["id"] == stay_id:

            deleted = stays.pop(i)

            return {
                "success": True,
                "data": deleted
            }

    raise HTTPException(
        status_code=404,
        detail="Homestay not found"
    )

