# RentEasy — Rental Equipment Platform (MERN Full Stack)

**Rent. Borrow. Explore.**

A complete full-stack rental marketplace where customers rent equipment, owners list and manage their
equipment, and administrators oversee the whole platform. Built with **MongoDB + Express.js + React + Node.js**.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [How to Run the Project](#how-to-run-the-project)
5. [Demo Login Credentials](#demo-login-credentials)
6. [Project Structure](#project-structure)
7. [API Reference](#api-reference)
8. [Troubleshooting](#troubleshooting)

---

## Tech Stack

**Backend**
- Node.js + Express.js — REST API
- MongoDB + Mongoose — database and ODM
- JSON Web Tokens (JWT) — authentication
- bcryptjs — password hashing
- CORS, Morgan, dotenv

**Frontend**
- React 18 + Vite
- React Router DOM v6 — routing and protected routes
- Context API — global state (auth, wishlist, toasts, notifications)
- Axios — API calls with a token interceptor
- Recharts — dashboard charts
- Lucide React — icons
- Tailwind CSS + custom design tokens

---

## Features

### Customer
- Browse equipment with live search, filters (category, location, price, rating, availability, verified owner) and sorting
- Equipment details page with specs, accessories, owner info and real customer reviews
- 5-step booking flow: dates → summary → your details → demo payment (UPI / Card / Net Banking) → confirmation
- Dashboard with active/completed rentals, total spent and recommendations
- My Bookings with status tabs (All / Upcoming / Active / Completed / Cancelled / Pending) and cancel action
- Wishlist persisted in localStorage
- Notification centre with unread badges
- **Review & feedback system** — after a rental is marked *Completed*, the customer can submit a 1–5 star
  rating and a written review. Validation enforces a rating and a minimum 10-character comment, one review
  per booking. Equipment ratings are recalculated automatically from real reviews.

### Equipment Owner
- Owner dashboard: total equipment, active rentals, pending requests, earnings, average rating
- Monthly earnings bar chart and equipment performance list
- My Equipment — view, edit and delete listings
- Add / Edit Equipment form with full validation
- Booking management — accept or reject pending requests, mark active rentals as returned
- Earnings page with trend chart and transaction history

### Administrator
- Platform dashboard: users, equipment, bookings, revenue, active rentals, pending reports
- User & booking growth line chart, equipment-by-category pie chart
- Manage Users — search, filter by role, suspend/activate, delete
- Manage Equipment — approve, reject or suspend listings
- Manage Bookings — full table with status filtering
- Manage Reviews — moderate and remove inappropriate reviews
- Reports & Complaints — view and resolve reported issues

### Platform-wide
- JWT authentication with role-based route protection (frontend and backend)
- Admin accounts cannot be created through public registration
- Responsive layout down to 375px, no horizontal scrolling; admin tables scroll horizontally on mobile
- Loading spinners, empty states, toast notifications and a custom 404 page

---

## Prerequisites

Install these before you start:

| Requirement | Version | Check with |
|---|---|---|
| Node.js | 18 or higher | `node -v` |
| npm | 9 or higher | `npm -v` |
| MongoDB | 6 or higher | `mongod --version` |

**MongoDB options** — pick one:
- **Local install:** [MongoDB Community Server](https://www.mongodb.com/try/download/community). Make sure the
  `mongod` service is running before you start the backend.
- **MongoDB Atlas (cloud, free tier):** create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas),
  then copy your connection string — you'll paste it into the backend `.env` in Step 1.

---

## How to Run the Project

You'll need **two terminals** — one for the backend, one for the frontend.

### Step 1 — Set up and start the backend

```bash
cd renteasy/backend
npm install
```

Create the environment file by copying the example:

```bash
# macOS / Linux
cp .env.example .env

# Windows (Command Prompt)
copy .env.example .env
```

Open `backend/.env` and set your values:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/renteasy
JWT_SECRET=any_long_random_string_you_choose
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

> Using MongoDB Atlas instead of a local database? Replace `MONGO_URI` with your Atlas connection string, e.g.
> `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/renteasy`

### Step 2 — Seed the database

This creates the demo accounts, 31 equipment listings, sample bookings, reviews, notifications and reports:

```bash
npm run seed
```

You should see a confirmation listing the demo credentials. To wipe all data later, run `npm run seed:destroy`.

### Step 3 — Start the API server

```bash
npm run dev
```

The API runs at **http://localhost:5000**. Verify it with http://localhost:5000/api/health — you should see
`{"status":"ok","service":"RentEasy API"}`.

> `npm run dev` uses nodemon for auto-restart. Use `npm start` for a plain run.

### Step 4 — Set up and start the frontend

Open a **second terminal**:

```bash
cd renteasy/frontend
npm install
```

Create its environment file:

```bash
# macOS / Linux
cp .env.example .env

# Windows (Command Prompt)
copy .env.example .env
```

`frontend/.env` should contain:

```env
VITE_API_URL=http://localhost:5000/api
```

Then start the dev server:

```bash
npm run dev
```

### Step 5 — Open the app

Visit **http://localhost:5173** in your browser and log in with any of the demo accounts below.

> Keep both terminals running. The frontend needs the backend alive to load data.

### Building for production

```bash
cd frontend
npm run build      # outputs to frontend/dist
npm run preview    # preview the production build locally
```

---

## Demo Login Credentials

| Role | Email | Password |
|---|---|---|
| Customer | `customer@renteasy.demo` | `customer123` |
| Equipment Owner | `owner@renteasy.demo` | `owner123` |
| Administrator | `admin@renteasy.demo` | `admin123` |

**Administrator sign-in:** select **Admin sign in** from the top navigation, or open
`http://localhost:5173/admin/login` directly. The administrator portal displays the demo credentials and
checks that the signed-in account has the administrator role. For local evaluation, set
`VITE_DEMO_MODE=true` to use browser-based demo data; to use the seeded MongoDB administrator above, set
`VITE_DEMO_MODE=false` and start the API first. Never deploy the demo password as a production credential.

Seeded secondary accounts (owners Meena R, Karthik S, Suresh Babu, Divya N and customers Vignesh R., Sowmya T.,
Ramesh V., Anitha K.) all use the password `password123`.

### Suggested walkthrough

**Customer flow** — log in as the customer → Browse → open any equipment → pick start and end dates →
Book Now → step through the demo payment → see the confirmation → My Bookings. Any booking with status
*Completed* has a **Leave Review** button; submit a rating and comment, then open that equipment's page to see
your review and the updated average rating.

**Owner flow** — log in as the owner → Dashboard shows pending requests (**Accept** / **Reject**) →
My Equipment → Add Equipment (new listings go to *Pending* for admin approval) → Bookings → Earnings.

**Admin flow** — log in as admin → Dashboard charts → Users (suspend/activate) → Equipment
(approve/reject/suspend — try approving the owner's new *Pending* listing) → Bookings → Reviews (remove one) →
Reports (resolve and export records) â†’ Search (find users, listings, and bookings) â†’ Updates & activity
(send announcements and review administrator activity).

---

## Project Structure

```
renteasy/
├── backend/
│   ├── config/db.js                 # MongoDB connection
│   ├── models/                      # User, Equipment, Booking, Review, Notification, Report
│   ├── middleware/
│   │   ├── auth.js                  # JWT protect + role authorize
│   │   └── errorHandler.js          # 404 + global error handling
│   ├── controllers/                 # auth, equipment, booking, review, notification, user, report
│   ├── routes/                      # route definitions per resource
│   ├── utils/                       # token + booking-code generators
│   ├── seed/
│   │   ├── seedData.js              # 31 equipment listings
│   │   └── seed.js                  # seeding script
│   ├── server.js                    # Express entry point
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   ├── axios.js             # axios instance + auth interceptor
    │   │   └── services.js          # all API service functions
    │   ├── context/
    │   │   ├── AuthContext.jsx      # user session, login/register/logout
    │   │   └── AppContext.jsx       # wishlist, toasts, notifications
    │   ├── components/              # Navbar, Footer, EquipmentCard, FilterSidebar,
    │   │                            # BookingModal, ProtectedRoute, Toasts, UI
    │   ├── data/categories.js       # category metadata, locations, helpers
    │   ├── pages/
    │   │   ├── Home, BrowseEquipment, EquipmentDetails, Categories,
    │   │   │   HowItWorks, About, Contact, Login, Register, NotFound
    │   │   ├── customer/            # CustomerDashboard, MyBookings, BookingRow, Wishlist, Notifications
    │   │   ├── owner/               # OwnerDashboard, MyEquipment, AddEquipment, OwnerBookings, OwnerEarnings
    │   │   └── admin/               # AdminDashboard, ManageUsers, ManageEquipment,
    │   │                            # ManageBookings, ManageReviews, Reports
    │   ├── App.jsx                  # routing
    │   ├── main.jsx                 # entry point
    │   └── index.css                # Tailwind + design tokens
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── .env.example
```

---

## API Reference

Base URL: `http://localhost:5000/api`

Protected routes require the header `Authorization: Bearer <token>`.

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Register as customer or owner |
| POST | `/auth/login` | Public | Log in, returns user + JWT |
| GET | `/auth/me` | Private | Current user profile |
| PUT | `/auth/me` | Private | Update profile |
| PUT | `/auth/password` | Private | Change password |

### Equipment
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/equipment` | Public | List with `search`, `category`, `location`, `priceMax`, `rating`, `availableOnly`, `verifiedOnly`, `sort`, `ownerId` |
| GET | `/equipment/:id` | Public | Single item (increments view count) |
| POST | `/equipment` | Owner | Create listing |
| PUT | `/equipment/:id` | Owner/Admin | Update listing |
| DELETE | `/equipment/:id` | Owner/Admin | Delete listing |
| PUT | `/equipment/:id/status` | Admin | Approve / Reject / Suspend |

### Bookings
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/bookings` | Customer | Create booking (calculates cost, fee, deposit) |
| GET | `/bookings/my` | Customer | Customer's bookings |
| GET | `/bookings/owner` | Owner | Bookings on owner's equipment |
| GET | `/bookings` | Admin | All bookings |
| PUT | `/bookings/:id/status` | Private | Update booking status |

### Reviews (feedback)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/reviews/equipment/:equipmentId` | Public | Reviews for one item |
| POST | `/reviews` | Customer | Submit review (completed bookings only, one per booking) |
| GET | `/reviews` | Admin | All reviews for moderation |
| DELETE | `/reviews/:id` | Admin | Remove a review |

### Notifications, Users, Reports
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/notifications/my` | Private | Current user's notifications |
| PUT | `/notifications/:id/read` | Private | Mark one as read |
| PUT | `/notifications/read-all` | Private | Mark all as read |
| GET | `/users` | Admin | List users with booking counts |
| PUT | `/users/:id/status` | Admin | Activate / Suspend |
| DELETE | `/users/:id` | Admin | Delete user |
| POST | `/reports` | Private | File a complaint |
| GET | `/reports` | Admin | All reports |
| PUT | `/reports/:id/status` | Admin | Mark Open / Resolved |

---

## Troubleshooting

**`MongoDB connection error` on backend start**
MongoDB isn't running or `MONGO_URI` is wrong. Start your local MongoDB service (`mongod`, or
`brew services start mongodb-community` on macOS, or start the MongoDB service in Windows Services). For Atlas,
confirm the connection string and add your IP under Network Access.

**"Could not load equipment. Is the backend server running?"**
The frontend can't reach the API. Confirm the backend terminal shows `RentEasy API running on port 5000`, and
that `frontend/.env` has `VITE_API_URL=http://localhost:5000/api`. Restart the frontend after editing `.env` —
Vite only reads environment variables at startup.

**Login fails with valid demo credentials**
The database probably hasn't been seeded. Run `npm run seed` in the backend folder.

**Empty pages after logging in**
Re-run the seed script, then log out and back in — the JWT is tied to a user document that gets recreated on
each seed.

**Port already in use**
Change `PORT` in `backend/.env` (and update `VITE_API_URL` to match), or change the port in `vite.config.js`
for the frontend.

**CORS errors in the browser console**
Ensure `CLIENT_URL` in `backend/.env` matches the address the frontend actually runs on (`http://localhost:5173`).

---

## Notes

- Payments are **simulated**. No payment gateway is integrated and no real transaction is processed — the
  demo payment step marks the booking as Paid so the rest of the flow works end to end.
- Equipment images are rendered as category-coloured icon tiles rather than photo uploads, so the project runs
  with no external image hosting or file-storage setup. Adding image upload (Multer + Cloudinary or S3) is a
  natural next step.
- `JWT_SECRET` in `.env.example` is a placeholder. Use a long random value, and never commit a real `.env`.

---

Built as a full-stack demonstration project. © 2026 RentEasy.
