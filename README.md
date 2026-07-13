# 🌿 EcoStay Connect – Sustainable Homestay Booking Platform

EcoStay Connect is a full-stack web application that promotes sustainable tourism by connecting travelers with eco-friendly homestays. The platform allows users to discover destinations, book accommodations, manage their travel history, submit reviews, and maintain personal profiles through a modern and responsive interface.

The project also includes a secure Admin Dashboard for managing homestays and monitoring booking analytics.

---

# 🔗 GitHub Repository

Repository Link:

https://github.com/Dhruv-saun/EcoStay-Connect---AI-Powered-Homestay

---

# 📌 Sector

**Homestay & Eco-Tourism**

---

# 📖 Project Overview

EcoStay Connect is designed to encourage sustainable tourism by providing an easy-to-use booking platform for eco-friendly accommodations.

Users can:

- Browse eco-friendly homestays
- Search and filter destinations
- Create an account
- Login securely
- Book homestays
- Manage bookings
- Save favorite destinations
- Submit reviews
- Update their profile
- Track booking history

Administrators can:

- Add new homestays
- View booking analytics
- Monitor platform activity
- Access booking trends
- Manage platform content securely

---

# 🚀 Tech Stack

## Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS

## Backend

- Supabase

## Database

- PostgreSQL (Supabase)

## Authentication

- Supabase Authentication

## Charts & Analytics

- Recharts

## Version Control

- Git
- GitHub

---

# ✨ Features Implemented

## 👤 User Features

- User Registration
- Email Verification
- Secure Login
- Logout
- Session Persistence
- User Profile Management
- Browse Homestays
- Search Homestays
- Filter by Location
- Sort by Price
- Favorite Homestays
- Book Homestays
- Booking Confirmation
- Cancel Booking
- Booking Status Tracking
- User Dashboard
- Submit Reviews
- Dark / Light Theme
- Responsive Design

---

## 🔐 Admin Features

- Protected Admin Dashboard
- Add New Homestays
- Platform Analytics
- Total Users
- Total Bookings
- Total Reviews
- Total Homestays
- Booking Trend Chart
- Most Popular Homestay
- Admin Route Protection

---

# 🗄 Database Schema

The project uses PostgreSQL (Supabase).

## Profiles

```
id (UUID)
full_name
phone
city
avatar_url
is_admin
created_at
```

## Homestays

```
id
title
location
description
image_url
price
created_at
```

## Bookings

```
id
user_id
homestay_id
guests
checkin
checkout
requests
status
created_at
```

## Favorites

```
id
user_id
homestay_id
created_at
```

## Reviews

```
id
user_id
homestay_id
rating
review
created_at
```

---

# 📊 Admin Dashboard

The Admin Dashboard includes:

- Total Users
- Total Homestays
- Total Bookings
- Total Reviews
- Booking Trend Analytics
- Most Popular Homestay
- Add New Homestays
- Protected Admin Access

---

# 👤 User Dashboard

Users can:

- View Profile
- Manage Personal Information
- View Booking History
- Cancel Bookings
- Track Booking Status
- Access Favorite Homestays
- View Latest Booking

---

# 🔒 Security Features

- Secure Authentication using Supabase
- Protected User Routes
- Protected Admin Routes
- Row Level Security (RLS)
- Secure Booking Storage
- Admin Authorization using Profiles Table

---

# 📂 Project Structure

```
EcoStay Connect

app/
│
├── admin/
├── booking/
├── booking-success/
├── dashboard/
├── favorites/
├── homestays/
├── login/
├── profile/
├── register/
├── reviews/
│
components/
│
lib/
│
public/
│   └── images/
│
screenshots/
│
README.md
```

---

# ⚙ Installation

Clone the repository

```bash
git clone https://github.com/Dhruv-saun/EcoStay-Connect---AI-Powered-Homestay.git
```

Move into the project

```bash
cd EcoStay-Connect---AI-Powered-Homestay
```

Install dependencies

```bash
npm install
```

Create a `.env.local` file

```
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Run the development server

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

# 📸 Screenshots

Add screenshots inside the **screenshots** folder.

Recommended screenshots:

- Home Page
- Login Page
- Registration Page
- Homestays Page
- Booking Page
- Dashboard
- Profile Page
- Favorites
- Reviews
- Admin Dashboard
- Booking Analytics

Example:

```
screenshots/
├── homepage.png
├── login.png
├── register.png
├── homestays.png
├── booking.png
├── dashboard.png
├── profile.png
├── admin-dashboard.png
```

---

# 📅 Weekly Progress

## ✅ Week 1

- Project Planning
- Documentation
- UI Design
- Repository Setup

---

## ✅ Week 2

- Homepage
- Navigation
- Responsive UI
- Homestay Listings

---

## ✅ Week 3

- Authentication
- Booking Interface
- Dashboard UI
- Dark Mode
- Responsive Components

---

## ✅ Week 4

- Supabase Integration
- PostgreSQL Database
- Authentication
- Booking Storage
- Row Level Security (RLS)

---

## ✅ Week 5

- User Profile Management
- Favorites System
- Booking Dashboard
- Booking Cancellation
- Booking Status Tracking
- Reviews System
- Admin Dashboard
- Booking Analytics
- Booking Trend Chart
- Add Homestays
- Admin Route Protection

---

# Week 6 Progress

## Features Implemented

### Admin Dashboard
- Dashboard Analytics
- Statistics Cards
- Booking Status Pie Chart
- Overall Platform Bar Chart

### User Management
- View Users
- Search Users
- Delete Users

### Homestay Management
- Add Homestays
- Edit Homestays
- Delete Homestays
- Search Homestays
- Image Upload using Supabase Storage

### Booking Management
- Search Bookings
- Filter by Status
- Update Booking Status
- Delete Booking

### Review Management
- Search Reviews
- Filter Reviews
- Delete Reviews

### Database
- Updated PostgreSQL Schema
- Foreign Keys
- Constraints
- Storage Policies

### Technologies Used
- Next.js
- React
- TypeScript
- Tailwind CSS
- FastAPI
- PostgreSQL
- Supabase
- Recharts

## Deliverables

- Screenshots PDF
- Database Schema
- Week 6 Report
- Updated README
- .env.example

---

# 🌱 Future Scope

- Google Maps Integration
- Payment Gateway
- Email Notifications
- Mobile Application
- Host Dashboard

---

# 👨‍💻 Developed By

**Dhruv Saun**

B.Tech Computer Science Engineering

Internship Project – 2026

---

# 📄 License

This project was developed for educational purposes as part of a B.Tech Internship Project.