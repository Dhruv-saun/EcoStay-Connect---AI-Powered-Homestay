# Week 7 Report – AI Travel Planner Integration

## Project Name
EcoStay Connect – AI-Powered Homestay Platform

---

## Objective

The objective of Week 7 was to integrate Google Gemini AI into EcoStay Connect to provide personalized and eco-friendly travel recommendations for users based on their destination, budget, and trip preferences.

---

## Features Implemented

- Integrated Google Gemini API.
- Created a FastAPI AI service.
- Added secure API key management using environment variables.
- Developed a backend endpoint:
  - POST /ai/travel-planner
- Built an AI Travel Planner page in Next.js.
- Connected frontend with backend API.
- Implemented loading and error states.
- Displayed AI-generated travel recommendations dynamically.

---

## Technologies Used

### Frontend
- Next.js
- TypeScript
- Tailwind CSS

### Backend
- FastAPI
- Python
- Google Gemini API

---

## Prompt Engineering

Designed a structured system prompt that generates:

- Eco-friendly homestay recommendations
- Day-wise itinerary
- Budget breakdown
- Eco travel tips
- Packing suggestions

The prompt ensures responses remain sustainable, budget-conscious, and practical.

---

## API Endpoint

POST /ai/travel-planner

Example Request:

{
    "prompt": "I want to visit Manali for 3 days with a budget of ₹10000."
}

Example Response:

- Eco-friendly homestay
- Travel itinerary
- Budget advice
- Eco travel tips
- Packing suggestions

---

## Challenges Faced

- Deprecated Gemini SDK warnings.
- Unsupported Gemini model errors.
- API quota limitations during testing.
- Frontend integration and response formatting.

All issues were successfully resolved, and the AI feature is fully operational.

---

## Outcome

Successfully integrated Gemini AI into EcoStay Connect. Users can now generate personalized eco-friendly travel plans directly from the application through an interactive AI-powered interface.

---

## Screenshots Included

- AI Travel Planner page
- Prompt entered
- Loading state
- AI-generated response
- Swagger successful API response
- GitHub commits
