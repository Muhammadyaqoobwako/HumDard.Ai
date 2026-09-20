# HamDard AI - Emotion-Aware Mentoring Platform

## Project Structure

This project is now organized with **separate frontend and backend** directories for better maintainability and deployment flexibility.

```
HamDard-AI/
├── frontend/                 # React + Vite frontend application
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable components
│   │   ├── contexts/        # React contexts
│   │   └── assets/          # Images, videos, etc.
│   ├── public/              # Static assets
│   ├── index.html           # HTML entry point
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind CSS config
│   └── postcss.config.js    # PostCSS configuration
│
├── backend/                  # Node.js/Express backend API
│   ├── controllers/         # Route controllers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── socket/              # WebSocket handlers
│   ├── server.js            # Main server file
│   ├── package.json         # Backend dependencies
│   └── README.md            # Backend documentation
│
├── package.json             # Root workspace configuration
└── README.md                # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm 9+ installed

### Installation

Install all dependencies for both frontend and backend:

```bash
npm run install:all
```

Or install separately:

```bash
npm run frontend:install
npm run backend:install
```

### Running the Application

#### Development Mode (Frontend Only)

```bash
npm run frontend:dev
```

The frontend will be available at `http://localhost:5173/`

#### Production Build (Frontend)

```bash
npm run frontend:build
npm run frontend:preview
```

#### Backend Server

```bash
cd backend
npm start
```

The backend API will be available at `http://localhost:3000/` (or configured port)

## Frontend

The frontend is built with:

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Heroicons** - Icon library

### Key Pages

- **Landing Page** - Home and product overview
- **Dashboard** - User's emotional tracking and analytics
- **Live Session** - Real-time AI mentoring session
- **Pricing** - Subscription plans
- **Login/Signup** - Authentication
- **Features** - Product features overview
- **About** - Company information
- **Contact** - Contact form

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Create production build
npm run preview    # Preview production build
```

## Backend

The backend is built with:

- **Node.js + Express** - Server framework
- **MongoDB** - Database
- **Socket.io** - Real-time communication
- **JWT** - Authentication

### Key Features

- User authentication and authorization
- Emotion analysis
- Session management
- Real-time WebSocket communication
- Message history storage

### Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start with nodemon (development)
```

## Environment Configuration

### Frontend

Create `.env` file in `/frontend` if needed for API endpoints.

### Backend

Create `.env` file in `/backend` with:

```
MONGODB_URI=mongodb://localhost:27017/hamdard
PORT=3000
JWT_SECRET=your_secret_key
# Other configurations...
```

See `/backend/.env.example` for all available options.

## Deployment

### Frontend Deployment

The frontend can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any CDN or static hosting

Build command: `npm run build` (generates dist folder)

### Backend Deployment

The backend can be deployed to:

- Heroku
- AWS EC2
- DigitalOcean
- Railway
- Render
- Any Node.js hosting

## Contributing

Please follow the existing code style and structure when making contributions.

## License

MIT

## Support

For issues and questions, please contact: hello@hamdard.ai
