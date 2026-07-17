from app.core.supabase import supabase


def get_all():
    response = (
        supabase
        .table("homestays")
        .select("*")
        .order("id")
        .execute()
    )

    return response.data