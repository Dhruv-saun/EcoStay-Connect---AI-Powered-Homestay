import os
import google.generativeai as genai

from app.ai.prompts import SYSTEM_PROMPT
from app.services.homestay_service import get_all

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("models/gemini-flash-latest")

def format_homestays():

    stays = get_all()

    if not stays:
        return "No homestays available."

    text = ""

    for stay in stays:

        text += f"""
            Title: {stay['title']}
            Location: {stay['location']}
            Price: ₹{stay['price']}
            Eco Score: {stay.get('eco_score', 'N/A')}
            WiFi: {'Yes' if stay.get('wifi') else 'No'}
            Parking: {'Yes' if stay.get('parking') else 'No'}
            Breakfast: {'Yes' if stay.get('breakfast') else 'No'}
            Pet Friendly: {'Yes' if stay.get('pet_friendly') else 'No'}

            """

    return text

def generate_travel_plan(user_prompt: str) -> str:
    available_homestays = format_homestays()

    prompt = f"""
    {SYSTEM_PROMPT}

    The following homestays are available in the EcoStay Connect database.

    Use these homestays whenever they match the user's destination and budget.

    If a suitable homestay exists, recommend it instead of inventing one.

    Available Homestays:

    {available_homestays}

    User Request:

    {user_prompt}
    """

    response = model.generate_content(prompt)

    print(response)

    if hasattr(response, "text") and response.text:
        return response.text

    return str(response)