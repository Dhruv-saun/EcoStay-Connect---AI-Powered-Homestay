from uuid import uuid4

from fastapi import HTTPException, status

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)
from app.core.supabase import supabase


def register_user(email: str, password: str, full_name: str):
    """
    Register a new user.
    """

    # Check if email already exists
    existing = (
        supabase.table("users")
        .select("id")
        .eq("email", email)
        .execute()
    )

    if existing.data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered."
        )

    user_id = str(uuid4())

    password_hash = hash_password(password)

    print("Creating user...")

    user_result = (
        supabase.table("users")
        .insert({
            "id": user_id,
            "email": email,
            "password_hash": password_hash,
            "full_name": full_name
        })
        .execute()
    )

    print("User insert result:", user_result.data)

    print("Creating profile...")

    profile_result = (
        supabase.table("profiles")
        .insert({
            "id": user_id,
            "full_name": full_name,
            "avatar_url": "",
            "phone": "",
            "city": "",
            "is_admin": False
        })
        .execute()
    )

    print("Profile insert result:", profile_result.data)

    return {
        "success": True,
        "message": "User registered successfully.",
        "user": {
            "id": user_id,
            "email": email,
            "full_name": full_name,
        },
    }


def login_user(email: str, password: str):
    """
    Authenticate a user and return a JWT.
    """

    result = (
        supabase.table("users")
        .select("*")
        .eq("email", email)
        .execute()
    )

    if not result.data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    user = result.data[0]
    
    profile = (
        supabase.table("profiles")
        .select("is_admin")
        .eq("id", user["id"])
        .single()
        .execute()
    )

    is_admin = profile.data["is_admin"]

    if not verify_password(password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    access_token = create_access_token(
        {
            "sub": user["id"],
            "email": user["email"],
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "is_admin": is_admin,
    }