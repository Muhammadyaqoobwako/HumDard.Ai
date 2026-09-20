# HumDard AI Backend

A comprehensive Node.js/Express backend for emotion-aware AI mentorship platform.

## Features

✅ **Authentication & Authorization**
- JWT-based authentication
- Password hashing with bcryptjs
- User roles (user, expert, admin)

✅ **Session Management**
- Real-time session tracking
- Emotion logging and analysis
- Session history and analytics

✅ **Real-Time Communication**
- Socket.IO for live messaging
- Real-time emotion detection
- Video triggering based on keywords

✅ **Emotion Detection**
- Text analysis
- Keyword detection
- Emotion intensity tracking
- Confidence scoring

✅ **Message System**
- User, AI, and expert messages
- Full conversation history
- Message search functionality

✅ **Analytics**
- User session statistics
- Emotion trends over time
- Performance metrics

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Real-Time**: Socket.IO
- **Authentication**: JWT + bcryptjs
- **Security**: Helmet, CORS

## Installation

### Prerequisites
- Node.js 16+
- MongoDB 4.4+
- npm or yarn

### Setup

1. **Clone the repository**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
cp .env.example .env
```

4. **Configure environment variables**
Edit `.env` with your settings:
```
MONGODB_URI=mongodb://localhost:27017/humdard
JWT_SECRET=your_secret_key
PORT=4000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

5. **Start MongoDB**
```bash
# macOS/Linux
mongod

# Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

6. **Run the server**
```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

Server will run on `http://localhost:4000`

## Project Structure

```
backend/
├── models/           # MongoDB schemas
│   ├── User.js
│   ├── Session.js
│   ├── Message.js
│   └── EmotionAnalysis.js
├── controllers/      # Business logic
│   ├── authController.js
│   ├── sessionController.js
│   ├── messageController.js
├── routes/          # API routes
│   ├── authRoutes.js
│   ├── sessionRoutes.js
│   └── messageRoutes.js
├── middleware/      # Custom middleware
│   └── auth.js
├── socket/          # Real-time handlers
│   └── socketHandler.js
├── server.js        # Main server file
├── package.json
└── .env.example
```

## API Documentation

### Authentication Endpoints

#### Sign Up
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Get Current User
```bash
GET /api/auth/me
Authorization: Bearer <token>
```

### Session Endpoints

#### Start Session
```bash
POST /api/sessions/start
Authorization: Bearer <token>
Content-Type: application/json

{
  "topic": "psychology",
  "sessionType": "voice"
}
```

#### End Session
```bash
POST /api/sessions/:sessionId/end
Authorization: Bearer <token>
Content-Type: application/json

{
  "summary": "Session summary...",
  "actionItems": ["Item 1", "Item 2"],
  "rating": 5,
  "feedback": "Very helpful"
}
```

#### Get Session History
```bash
GET /api/sessions/history?page=1&limit=10
Authorization: Bearer <token>
```

### Message Endpoints

#### Send Message
```bash
POST /api/messages/send
Authorization: Bearer <token>
Content-Type: application/json

{
  "sessionId": "session_id",
  "content": "I'm feeling anxious",
  "messageType": "text"
}
```

#### Get Session Messages
```bash
GET /api/messages/:sessionId?page=1&limit=50
Authorization: Bearer <token>
```

## Socket.IO Events

### Client Events
```javascript
// Join session
socket.emit('join:session', { sessionId: '...' });

// Send message
socket.emit('user:message', {
  sessionId: '...',
  content: 'User message',
  emotionalContext: { emotion: 'sad', intensity: 7 }
});

// Emotion detected
socket.emit('emotion:detected', {
  sessionId: '...',
  emotion: 'anxious',
  intensity: 8,
  keywords: ['worried', 'stressed']
});

// Video triggered
socket.emit('video:triggered', {
  sessionId: '...',
  keyword: 'anxiety',
  videoPath: 'sad.mp4'
});
```

### Server Events
```javascript
// Session joined
socket.on('session:joined', (data) => {
  console.log('Joined session:', data.sessionId);
});

// New message
socket.on('message:new', (message) => {
  console.log('New message:', message.content);
});

// Emotion updated
socket.on('emotion:updated', (data) => {
  console.log('Emotion:', data.emotion);
});

// Video to play
socket.on('video:play', (data) => {
  console.log('Play video:', data.videoPath);
});
```

## Database Schema

See `DATABASE_SCHEMA.md` for detailed schema documentation.

### Collections:
- **Users** - User accounts and profiles
- **Sessions** - Session records
- **Messages** - Conversation messages
- **EmotionAnalysis** - Emotion detection records

## Testing

```bash
npm test
```

## Development

### Hot Reload
Server automatically reloads on file changes (nodemon)

### Database
- Local: `mongodb://localhost:27017/humdard`
- Atlas: Update `MONGODB_URI` in `.env`

### Logging
Check console output for:
- Connection status
- Error messages
- Real-time events

## Deployment

### MongoDB Atlas
1. Create cluster on mongodb.com
2. Get connection string
3. Update `MONGODB_URI` in `.env`

### Environment Variables
Update for production:
```
NODE_ENV=production
JWT_SECRET=<strong_random_secret>
PORT=<your_port>
CLIENT_URL=<frontend_url>
```

### Deploy to Heroku
```bash
heroku create humdard-api
heroku config:set JWT_SECRET=<secret>
git push heroku main
```

## Error Handling

The backend includes:
- Request validation
- Error middleware
- JWT verification
- Database error handling

## Security

- ✅ Password hashing (bcryptjs)
- ✅ JWT authentication
- ✅ CORS protection
- ✅ Helmet security headers
- ✅ Input validation

## Future Enhancements

- [ ] AI integration (OpenAI/Claude)
- [ ] Advanced emotion analysis
- [ ] Email notifications
- [ ] File uploads
- [ ] Rate limiting
- [ ] Caching with Redis
- [ ] Payment integration
- [ ] Admin dashboard API

## Support

For issues or questions, contact the development team.

## License

MIT
