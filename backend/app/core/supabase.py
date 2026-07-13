import os
from pathlib import Path

from dotenv import load_dotenv
from supabase import create_client, Client

env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(dotenv_path=env_path)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

print("URL:", SUPABASE_URL)
print("KEY LENGTH:", len(SUPABASE_KEY) if SUPABASE_KEY else None)
print("FIRST 25 CHARS:", SUPABASE_KEY[:25] if SUPABASE_KEY else None)

supabase: Client = create_client(
    SUPABASE_URL,
    SUPABASE_KEY,
)

print("Connected to Supabase")
print("Role key starts with:", SUPABASE_KEY[:30])
print("Supabase URL:", SUPABASE_URL)

result = supabase.table("favorites").select("*").limit(1).execute()
print("Favorites table accessible:", result.data)