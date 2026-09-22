# HumDard AI - Quick Start Guide

## New Project Structure ✨

Your project has been reorganized with **separate frontend and backend** directories:

```
HumDard-AI/
├── frontend/          ← React Vite app
├── backend/           ← Node.js Express API
└── package.json       ← Root workspace config
```

## Quick Start

### 1️⃣ Install Dependencies (One Command)

```bash
npm run install:all
```

This installs dependencies for:

- **Frontend** → `/frontend/node_modules`
- **Backend** → `/backend/node_modules`

### 2️⃣ Start Frontend (Development)

```bash
npm run frontend:dev
```

✅ Opens at http://localhost:5173/

### 3️⃣ Start Backend (Separate Terminal)

```bash
cd backend
npm start
```

✅ Runs at http://localhost:3000/

---

## Useful Commands

### Frontend Commands

```bash
npm run frontend:dev       # Development server
npm run frontend:build     # Production build
npm run frontend:preview   # Preview production build
```

### Backend Commands

```bash
cd backend
npm start                  # Production start
npm run dev              # Development with nodemon
```

### Full Stack Commands

```bash
npm run install:all      # Install all dependencies
npm run dev              # Start frontend dev server
npm run build            # Build frontend for production
```

---

## Key Changes

| What Changed           | Location        | Details                                          |
| ---------------------- | --------------- | ------------------------------------------------ |
| **Frontend React App** | `/frontend/src` | All React components, pages, contexts            |
| **Frontend Config**    | `/frontend/`    | vite.config.js, tailwind.config.js, package.json |
| **Backend API**        | `/backend/`     | Express server, models, routes, controllers      |
| **Root Config**        | `/`             | New workspace package.json with scripts          |

---

## Environment Setup

### Frontend `.env` (if needed)

Create `/frontend/.env`:

```
VITE_API_URL=http://localhost:3000
```

### Backend `.env`

Create `/backend/.env`:

```
MONGODB_URI=mongodb://localhost:27017/humDard
PORT=3000
JWT_SECRET=your_secret_key
```

See `/backend/.env.example` for all options.

---

## Deployment

### Deploy Frontend

```bash
cd frontend
npm run build
# Deploy the 'dist' folder to:
# - Vercel, Netlify, GitHub Pages, AWS S3, etc.
```

### Deploy Backend

```bash
# Deploy the 'backend' folder to:
# - Heroku, Railway, Render, AWS, DigitalOcean, etc.
```

---

## Troubleshooting

### Frontend won't start?

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend won't start?

```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm start
```

### MongoDB connection issue?

- Ensure MongoDB is running locally or update `MONGODB_URI` in `/backend/.env`

---

## Need Help?

- Frontend issues → Check `/frontend/README.md` or `vite.config.js`
- Backend issues → Check `/backend/README.md` or `server.js`
- General questions → See `/README.md`

**Contact:** hello@humDard.ai

Happy coding! 🚀
