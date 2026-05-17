# MediCare Plus — Hospital Management System

Full-stack hospital website with public pages, appointment booking, and admin dashboard.

## Tech Stack

**Frontend:** React, TypeScript, Tailwind CSS, React Router, Framer Motion, Axios  
**Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose, JWT (admin only)

## Project Structure

```
Medical/
├── backend/          # REST API
└── frontend/         # React SPA
```

## Prerequisites

- Node.js 18+
- MongoDB running locally or MongoDB Atlas URI

## Setup

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

API runs at `http://localhost:5000`

**Default admin:** `admin@hospital.com` / `Admin@123`

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Site runs at `http://localhost:5173`

## Features

### Public Website
- Sticky navbar with About Us & Departments dropdowns
- Home, About Hospital, About Organisation, Departments, Doctors, Patient Corner, Contact
- Doctor detail modal with reviews and booking link
- Multi-step appointment booking (no patient login)
- Dark/light mode, AI chatbot UI, emergency call button
- Testimonials, gallery, FAQ, statistics

### Admin Panel (`/admin/login`)
- Dashboard analytics with charts
- Manage doctors (with image upload), departments, appointments
- Manage blogs and career posts
- JWT-protected routes only

## API Endpoints

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/auth/login` | Public |
| GET | `/api/doctors` | Public |
| GET | `/api/departments` | Public |
| POST | `/api/appointments` | Public |
| GET | `/api/blogs` | Public |
| GET | `/api/dashboard/stats` | Admin |

## License

MIT
