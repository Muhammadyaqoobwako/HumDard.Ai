# HumDard AI Backend - Database Schema Documentation

## Collections Overview

### 1. Users Collection
Stores user account information and preferences.

```javascript
{
  _id: ObjectId,
  fullName: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  phone: String,
  avatar: String (URL),
  bio: String,
  role: String (enum: "user", "expert", "admin"),
  expertise: [String] (enum: "psychology", "legal", "career", "general"),
  isVerified: Boolean,
  status: String (enum: "active", "inactive", "suspended"),
  sessionCount: Number (default: 0),
  totalSessionMinutes: Number (default: 0),
  ratings: {
    average: Number (0-5),
    count: Number
  },
  preferences: {
    language: String (default: "en"),
    theme: String (enum: "light", "dark"),
    notifications: Boolean
  },
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

### 2. Sessions Collection
Stores individual session records between users and the AI.

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, required),
  expertId: ObjectId (ref: User),
  sessionType: String (enum: "text", "voice", "video"),
  topic: String (enum: "psychology", "legal", "career", "general"),
  status: String (enum: "ongoing", "completed", "cancelled"),
  startTime: Date (default: now),
  endTime: Date,
  durationMinutes: Number,
  emotionLog: [
    {
      timestamp: Date,
      emotion: String (enum: "happy", "sad", "anxious", "confident", "neutral"),
      intensity: Number (1-10),
      transcript: String
    }
  ],
  messages: [ObjectId] (ref: Message),
  videoKeywords: [String],
  transcription: String,
  summary: String,
  actionItems: [String],
  rating: {
    score: Number (1-5),
    feedback: String
  },
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

### 3. Messages Collection
Stores all messages within sessions (user, AI, expert).

```javascript
{
  _id: ObjectId,
  sessionId: ObjectId (ref: Session, required),
  senderId: ObjectId (ref: User, required),
  senderType: String (enum: "user", "ai", "expert"),
  messageType: String (enum: "text", "voice", "video", "system"),
  content: String (required),
  mediaUrl: String,
  emotionalContext: {
    detectedEmotion: String,
    emotionIntensity: Number (1-10),
    keywords: [String]
  },
  aiResponse: {
    isAIGenerated: Boolean,
    aiModel: String,
    confidence: Number (0-1)
  },
  reactions: Map<String, Number>,
  isEdited: Boolean,
  editedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

### 4. EmotionAnalysis Collection
Detailed emotion detection records with AI confidence scores.

```javascript
{
  _id: ObjectId,
  sessionId: ObjectId (ref: Session, required),
  userId: ObjectId (ref: User, required),
  timestamp: Date (default: now),
  detectedEmotion: String (enum: emotions, required),
  intensity: Number (1-10, required),
  confidence: Number (0-1, required),
  source: String (enum: "text-analysis", "voice-analysis", "keyword-detection"),
  transcript: String,
  keywords: [String],
  suggestedResponses: [String],
  videoTriggered: String,
  userReaction: String (enum: "helpful", "not-helpful", "neutral"),
  createdAt: Date
}
```

---

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)
- `POST /api/auth/logout` - Logout (protected)

### Sessions
- `POST /api/sessions/start` - Start new session (protected)
- `POST /api/sessions/:sessionId/end` - End session (protected)
- `GET /api/sessions/history` - Get session history (protected)
- `GET /api/sessions/:sessionId` - Get session details (protected)
- `POST /api/sessions/:sessionId/emotion` - Log emotion (protected)
- `GET /api/sessions/analytics/trends` - Get emotion trends (protected)

### Messages
- `POST /api/messages/send` - Send message (protected)
- `GET /api/messages/:sessionId` - Get session messages (protected)
- `POST /api/messages/ai-response` - Generate AI response (protected)
- `DELETE /api/messages/:messageId` - Delete message (protected)
- `GET /api/messages/search` - Search messages (protected)

---

## Real-Time Events (Socket.IO)

### Client to Server
- `join:session` - User joins a session
- `user:message` - User sends message
- `emotion:detected` - Emotion detected in user message
- `video:triggered` - Video triggered by keyword
- `user:typing` - User is typing
- `session:end` - End session

### Server to Client
- `session:joined` - Session successfully joined
- `message:new` - New user message
- `message:ai` - AI response message
- `emotion:updated` - Emotion log updated
- `video:play` - Play video for emotion/keyword
- `user:typing` - Another user is typing
- `session:ended` - Session ended
- `error` - Error occurred

---

## Indexes (for performance)

```javascript
// Users
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ lastLogin: -1 });

// Sessions
db.sessions.createIndex({ userId: 1, createdAt: -1 });
db.sessions.createIndex({ status: 1 });

// Messages
db.messages.createIndex({ sessionId: 1, createdAt: 1 });
db.messages.createIndex({ senderId: 1 });

// EmotionAnalysis
db.emotionanalysis.createIndex({ userId: 1, timestamp: -1 });
db.emotionanalysis.createIndex({ sessionId: 1 });
```

---

## Authentication Flow

1. User signs up with email/password
2. Password hashed with bcryptjs
3. JWT token generated (7-day expiry)
4. Token sent to client for future requests
5. Token validated on protected routes
6. Socket.IO connection authenticated with token

---

## Data Flow Example

1. User starts session → `POST /api/sessions/start`
2. Session created with `status: "ongoing"`
3. User speaks → Speech recognition detects emotion
4. Emotion logged → `POST /api/sessions/:sessionId/emotion`
5. Socket event: `emotion:detected` broadcasted
6. AI generates response based on emotion
7. Video triggered if keyword matches
8. Message saved to database
9. User ends session → `POST /api/sessions/:sessionId/end`
10. Session marked as `status: "completed"`
11. Analytics updated
