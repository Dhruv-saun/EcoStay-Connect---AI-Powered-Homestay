from fastapi import Request
from fastapi.responses import JSONResponse


class NotFoundException(Exception):

    def __init__(self, message):

        self.message = message


async def not_found_handler(
    request: Request,
    exc: NotFoundException
):

    return JSONResponse(
        status_code=404,
        content={
            "success": False,
            "message": exc.message
        }
    )