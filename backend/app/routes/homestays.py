from fastapi import (
    APIRouter,
    HTTPException,
    status
)

from app.services.homestay_service import (
    get_all
)

router = APIRouter()


@router.get(
    "/homestays",
    status_code=200
)
def get_homestays():

    return get_all()


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