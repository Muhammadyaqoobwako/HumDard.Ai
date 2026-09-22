import jwt from "jsonwebtoken";
import Message from "../models/Message.js";
import Session from "../models/Session.js";

const activeSessions = new Map();

export const initializeSocket = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication error"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.userId;
      next();
    } catch (error) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.userId}`);

    // User joins a session
    socket.on("join:session", async (sessionId) => {
      try {
        socket.join(sessionId);
        activeSessions.set(sessionId, socket.userId);

        const session = await Session.findById(sessionId);
        socket.emit("session:joined", {
          sessionId,
          messages: session.messages,
        });
      } catch (error) {
        socket.emit("error", { message: error.message });
      }
    });

    // User sends a message
    socket.on("user:message", async (data) => {
      try {
        const { sessionId, content, emotionalContext } = data;

        // Save message
        const message = await Message.create({
          sessionId,
          senderId: socket.userId,
          senderType: "user",
          content,
          emotionalContext,
        });

        // Broadcast to all users in session
        io.to(sessionId).emit("message:new", message);

        // Generate AI response
        const aiResponses = {
          sad: "I hear you. Let us break this challenge into one small next step.",
          anxious:
            "That sounds heavy. Take a deep breath, then tell me the hardest part first.",
          happy: "That's wonderful! What made you feel this way?",
          neutral: "Thank you for sharing. I'm here to help.",
        };

        const aiMessage = await Message.create({
          sessionId,
          senderType: "ai",
          content:
            aiResponses[emotionalContext?.emotion] || aiResponses.neutral,
          aiResponse: {
            isAIGenerated: true,
            confidence: 0.85,
          },
        });

        io.to(sessionId).emit("message:ai", aiMessage);
      } catch (error) {
        socket.emit("error", { message: error.message });
      }
    });

    // Emotion detection
    socket.on("emotion:detected", async (data) => {
      try {
        const { sessionId, emotion, intensity, keywords } = data;

        // Update session emotion log
        await Session.findByIdAndUpdate(sessionId, {
          $push: {
            emotionLog: {
              timestamp: new Date(),
              emotion,
              intensity,
              transcript: keywords.join(" "),
            },
          },
          $addToSet: {
            videoKeywords: { $each: keywords },
          },
        });

        // Broadcast emotion to all users in session
        io.to(sessionId).emit("emotion:updated", {
          emotion,
          intensity,
          keywords,
        });
      } catch (error) {
        socket.emit("error", { message: error.message });
      }
    });

    // Video triggered by keyword
    socket.on("video:triggered", (data) => {
      const { sessionId, keyword, videoPath } = data;
      io.to(sessionId).emit("video:play", { keyword, videoPath });
    });

    // Typing indicator
    socket.on("user:typing", (sessionId) => {
      socket.broadcast.to(sessionId).emit("user:typing", {
        userId: socket.userId,
      });
    });

    // Session ends
    socket.on("session:end", async (sessionId) => {
      try {
        await Session.findByIdAndUpdate(sessionId, {
          status: "completed",
          endTime: new Date(),
        });

        io.to(sessionId).emit("session:ended", { sessionId });
        socket.leave(sessionId);
        activeSessions.delete(sessionId);
      } catch (error) {
        socket.emit("error", { message: error.message });
      }
    });

    // User disconnects
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.userId}`);
      activeSessions.forEach((userId, sessionId) => {
        if (userId === socket.userId) {
          activeSessions.delete(sessionId);
        }
      });
    });
  });
};
