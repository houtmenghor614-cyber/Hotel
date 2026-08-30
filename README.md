# Frontend User — Hotel Booking Website

A user-facing React frontend for the hotel booking website. It talks to the
FastAPI backend in `../backend`.

## Tech Stack

- **React 18 + Vite** (fast dev server and builds)
- **React Router v6** for routing
- **Axios** for API calls (with automatic JWT refresh)
- **Tailwind CSS via the Play CDN** — no PostCSS build step needed; utilities
  are compiled in the browser at runtime
- **Inline SVG icons** — no emoji, no icon font dependency

## Getting Started

1. Start the backend first (see `../backend/README.md`):

   ```bash
   cd ../backend
   uvicorn app.main:app --reload   # runs on http://127.0.0.1:8000
   ```

   (or double-click `start_backend.bat` in the `backend` folder)

2. Install dependencies and run the frontend:

   ```bash
   cd frontend_user
   npm install
   npm run dev          # http://localhost:5173
   ```

   (or double-click `start_frontend.bat` in this folder)

The Vite dev server proxies `/api` and `/uploads` to `http://127.0.0.1:8000`,
so no CORS configuration is required during development.

## Default Accounts

| Role | Username / Email | Password |
|------|------------------|----------|
| User | `user@hotel.com` | `user123` |

Create your own account from the **Register** page as well.

## Project Layout

```
frontend_user/
├── public/                # static assets (images, svg icons, favicon)
│   └── index.html         # kept to match the project structure (Vite uses root index.html)
├── src/
│   ├── api/               # axios instance + endpoint modules
│   ├── components/        # common, layout, home, hotel, room, booking, review, account
│   ├── context/           # AuthContext + BookingContext
│   ├── hooks/             # useAuth, useBooking, useFetch, useDebounce
│   ├── layouts/           # MainLayout, AccountLayout (protected)
│   ├── pages/             # all routes
│   ├── routes/            # AppRoutes.jsx
│   └── utils/             # price/date formatting, totals, validators
├── index.html             # Vite entry with Tailwind CDN
├── package.json
├── tailwind.config.js     # kept for a future Tailwind build pipeline
└── postcss.config.js      # kept for a future Tailwind build pipeline
```

## Notes

- `public/assets/**` images are **generated gradient placeholders**.
  Replace them with real photos (keep the same filenames) when you have them.
- The seeded backend hotels reference images under `/uploads/...` that do not
  exist yet; the `<Img>` component automatically falls back to a local
  placeholder until real images are uploaded through the admin panel.
- `public/index.html` is a copy of the root `index.html` so the folder layout
  matches the requested structure; **Vite uses the root `index.html`**.
