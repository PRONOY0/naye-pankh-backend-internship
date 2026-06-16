# NayePankh Backend Internship

## Project Description

A Volunteer Information Management System backend built with Node.js and Express.js. Includes authentication, role-based access control, and admin-level operations for managing volunteers. Uses PostgreSQL as the database with Prisma ORM.

## Tech Stack

Node.js, Express.js, PostgreSQL, Prisma, jsonwebtoken, bcrypt

## Database

NayePankh

## Setup Instructions

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The project uses nodemon for development.

## Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL=
JWT_SECRET=
```

Refer to `.env.example` for reference.

## API Routes

**Authentication** — `/api/auth`
Login, signup, logout, and me

**Volunteer** — `/api/volunteers`
Create volunteer, get volunteers, update volunteer (PATCH)

**Admin** — `/api/admin`
Get all volunteers, update volunteer status (PATCH). Admin only.

## Pagination

Implemented in the get all volunteers endpoint.

## Admin Credentials

Email: admin@gmail.com  
Password: 123456

## Project Structure

Controllers, Routes, Prisma config
