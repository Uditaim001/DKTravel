# 🌍 WanderLust Travels – Full Website + Admin Panel

A complete tour & travel website with admin panel, hotel/flight booking requests, and a REST API backend.

---

## 📁 Project Structure

```
travel-website/
├── backend/          ← Node.js + Express REST API
│   ├── server.js
│   ├── routes/
│   │   ├── tours.js
│   │   ├── packages.js
│   │   ├── bookings.js
│   │   ├── hotelRequests.js
│   │   ├── flightRequests.js
│   │   ├── testimonials.js
│   │   ├── auth.js
│   │   ├── settings.js
│   │   └── dashboard.js
│   ├── middleware/
│   │   └── auth.js
│   └── data/         ← Auto-created JSON data files
├── frontend/
│   └── index.html    ← Public-facing website
└── admin/
    └── admin.html    ← Admin dashboard
```

---

## 🚀 Setup & Run

### Step 1 – Install Node.js
Download from https://nodejs.org (v16 or higher)

### Step 2 – Install Backend Dependencies
```bash
cd travel-website/backend
npm install
```

### Step 3 – Start the Backend Server
```bash
npm start
```
Server runs at: **http://localhost:5000**

### Step 4 – Open the Website
- **Public Website:** Open `frontend/index.html` in your browser
- **Admin Panel:** Open `admin/admin.html` in your browser

> Tip: Use VS Code Live Server extension or any static file server for best results.

---

## 🔐 Admin Login

| Field    | Value     |
|----------|-----------|
| Username | `admin`   |
| Password | `password`|

Change your password after first login via Settings → Change Password.

---

## ✨ Features

### Public Website (index.html)
- 🏠 Hero section with animated stats
- 🔍 Quick tour search by destination & category
- 🗺️ Tours listing with category filters (Cultural, Adventure, Beach, Nature, Spiritual)
- 🎁 Holiday packages section
- 🏨 Hotel booking request form (submits to backend)
- ✈️ Flight booking request form (submits to backend)
- 💬 Customer testimonials
- 📱 Responsive design (mobile-friendly)
- 🔔 Toast notifications for booking confirmations

### Admin Panel (admin.html)
- 📊 Dashboard with live stats (bookings, revenue, requests)
- 🗺️ **Tours CRUD** – Add, edit, delete, toggle active/featured
- 🎁 **Packages CRUD** – Full management of holiday packages
- 📋 **Tour Bookings** – View, update status, delete
- 🏨 **Hotel Requests** – Manage hotel booking requests
- ✈️ **Flight Requests** – Manage flight booking requests
- 💬 **Testimonials** – Approve/reject customer reviews
- ⚙️ **Settings** – Update phone, email, address, site name
- 🔐 **Change Password**

---

## 🌐 API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tours` | Get all active tours |
| GET | `/api/tours/:id` | Get single tour |
| GET | `/api/packages` | Get all packages |
| GET | `/api/testimonials` | Get published reviews |
| POST | `/api/bookings` | Submit tour booking |
| POST | `/api/hotel-requests` | Submit hotel request |
| POST | `/api/flight-requests` | Submit flight request |
| GET | `/api/settings` | Get site settings |

### Admin (JWT required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/dashboard/stats` | Dashboard statistics |
| GET | `/api/tours/admin/all` | All tours incl. inactive |
| POST | `/api/tours` | Create tour |
| PUT | `/api/tours/:id` | Update tour |
| DELETE | `/api/tours/:id` | Delete tour |
| GET | `/api/bookings` | All bookings |
| PUT | `/api/bookings/:id` | Update booking status |
| GET | `/api/hotel-requests` | All hotel requests |
| GET | `/api/flight-requests` | All flight requests |
| PUT | `/api/settings` | Update site settings |

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, JWT Auth, bcryptjs
- **Storage:** JSON files (no database needed – zero setup!)
- **Frontend:** Pure HTML, CSS, JavaScript (no framework needed)
- **Fonts:** Google Fonts (Playfair Display + DM Sans)

---

## 📞 Contact & Booking Flow

1. Customer fills hotel/flight request form on website
2. Request saved to backend with reference number
3. Admin sees pending requests in dashboard
4. Admin updates status to "Contacted" or "Confirmed"
5. Your team calls/emails the customer to finalize

---

## 🔧 Customization

Edit `backend/data/settings.json` to change:
- Site name, phone, email, address
- WhatsApp number for chat link

Or update via Admin Panel → Settings.

---

## 📦 Deploy to Production

For production deployment:
1. Host backend on **Railway**, **Render**, or **VPS**
2. Host frontend on **Netlify**, **Vercel**, or same VPS
3. Update `const API = 'http://localhost:5000/api'` in both HTML files to your live URL
4. Set `JWT_SECRET` environment variable to a strong random string
