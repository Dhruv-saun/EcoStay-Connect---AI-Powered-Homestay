# Database Design
## Overview
EcoStay Connect uses PostgreSQL (Supabase) to manage users, homestays, bookings, reviews, and AI interactions.
---
# Users Table
Stores account information.
| Column        | Type      |
| ------------- | --------- |
| id            | UUID      |
| full_name     | VARCHAR   |
| email         | VARCHAR   |
| password_hash | TEXT      |
| role          | ENUM      |
| created_at    | TIMESTAMP |
---
# Homestays Table
Stores listed homestays.
| Column          | Type      |
| --------------- | --------- |
| id              | UUID      |
| host_id         | UUID      |
| title           | VARCHAR   |
| description     | TEXT      |
| location        | VARCHAR   |
| price_per_night | INTEGER   |
| image_url       | TEXT      |
| created_at      | TIMESTAMP |
---
# Bookings Table
Stores booking records.
| Column         | Type      |
| -------------- | --------- |
| id             | UUID      |
| user_id        | UUID      |
| homestay_id    | UUID      |
| check_in       | DATE      |
| check_out      | DATE      |
| booking_status | VARCHAR   |
| created_at     | TIMESTAMP |
---
# Reviews Table
Stores customer feedback.
| Column      | Type      |
| ----------- | --------- |
| id          | UUID      |
| user_id     | UUID      |
| homestay_id | UUID      |
| rating      | INTEGER   |
| comment     | TEXT      |
| created_at  | TIMESTAMP |
---
# AI Recommendations Table
Stores AI-generated recommendations.
| Column         | Type      |
| -------------- | --------- |
| id             | UUID      |
| user_id        | UUID      |
| recommendation | TEXT      |
| generated_at   | TIMESTAMP |
---
# Relationships
Users
↓
Homestays
↓
Bookings
↓
Reviews
One User → Many Bookings
One Host → Many Homestays
One Homestay → Many Reviews