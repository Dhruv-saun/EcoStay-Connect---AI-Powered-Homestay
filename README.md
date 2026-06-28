# 🌿 EcoStay Connect – AI Powered Homestay Platform

EcoStay Connect is a full-stack web application designed to support sustainable tourism and eco-friendly homestay discovery.

The platform allows users to explore homestays, view stay details, and make bookings through a modern web experience.

This project is developed as part of an internship program and follows milestone-based weekly deliverables.

---

# 📌 Sector

Homestay & Eco-Tourism

---

# 📖 Project Description

EcoStay Connect is an AI-powered homestay discovery and booking platform that connects travelers with sustainable and eco-friendly stays.

Users can:

* Browse available homestays
* Explore destinations
* Register and login
* View homestay listings
* Book accommodations
* Experience dark/light mode UI

Future updates will integrate AI recommendations and personalized travel experiences.

---

# 🚀 Tech Stack

## Frontend

* Next.js
* React.js
* Tailwind CSS

## Backend

* FastAPI (Python)

## Database

* In-memory data storage (Current)
* PostgreSQL + Supabase (Planned)

## Version Control

* Git
* GitHub

---

# ✨ Implemented Features

## Frontend

✅ Responsive Homepage
✅ Navigation Bar
✅ Hero Section
✅ Search Bar UI
✅ Featured Destinations
✅ Homestay Listing Page
✅ Booking Page
✅ Dashboard Page
✅ Login & Register UI
✅ Dark / Light Mode
✅ Responsive Layout

## Backend

✅ REST API using FastAPI
✅ GET All Homestays
✅ GET Single Homestay
✅ POST Create Homestay
✅ PUT Update Homestay
✅ DELETE Homestay
✅ Search Endpoint
✅ Proper HTTP Status Codes
✅ Validation Handling
✅ Exception Middleware

---

# 🔌 Backend API Endpoints

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| GET    | /homestays        | Get all homestays |
| GET    | /homestays/{id}   | Get one homestay  |
| POST   | /homestays        | Create homestay   |
| PUT    | /homestays/{id}   | Update homestay   |
| DELETE | /homestays/{id}   | Delete homestay   |
| GET    | /homestays/search | Search homestays  |

---

# 📂 Project Structure

```plaintext
EcoStay-Connect---AI-Powered-Homestay

frontend/
backend/
docs/
screenshots/
README.md
```

---

# ⚙️ How To Run Frontend Locally

```bash
git clone <YOUR_GITHUB_REPO_LINK>

cd EcoStay-Connect---AI-Powered-Homestay

cd frontend

npm install

npm run dev
```

Open:

```plaintext
http://localhost:3000
```

---

# ⚙️ How To Run Backend Locally

Open new terminal:

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend:

```plaintext
http://localhost:8000
```

Swagger:

```plaintext
http://localhost:8000/docs
```

---

# 🔐 Environment Variables

Create:

```plaintext
backend/.env
```

Example:

```env
DATABASE_URL=
SUPABASE_URL=
SUPABASE_KEY=
```

Create:

```plaintext
backend/.env.example
```

Add variable names only.

---

# 📸 Screenshots

## Homepage

![Homepage](./screenshots/homepage.png)

## Homestays

![Homestays](./screenshots/homestays-page.png)

## Dashboard

![Dashboard](./screenshots/dashboard-page.png)

---

# 📅 Progress Status

### Week 1

* Planning
* Documentation

### Week 2

* Frontend Development

### Week 3

* UI & Responsiveness

### Week 4

* FastAPI Backend
* REST API
* Frontend ↔ Backend Connection
* API Testing

---

# 🧠 Future Improvements

* AI Recommendations
* Smart Search
* User Profiles
* Authentication
* Booking History
* Supabase Integration

---

# 👨‍💻 Developed By

Dhruv Saun
Internship Project – 2026
