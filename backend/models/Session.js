import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expertId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    sessionType: {
      type: String,
      enum: ["text", "voice", "video"],
      default: "voice",
    },
    topic: {
      type: String,
      enum: ["psychology", "legal", "career", "general"],
      default: "general",
    },
    status: {
      type: String,
      enum: ["ongoing", "completed", "cancelled"],
      default: "ongoing",
    },
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: {
      type: Date,
      default: null,
    },
    durationMinutes: {
      type: Number,
      default: 0,
    },
    emotionLog: [
      {
        timestamp: Date,
        emotion: {
          type: String,
          enum: ["happy", "sad", "anxious", "confident", "neutral"],
        },
        intensity: {
          type: Number,
          min: 1,
          max: 10,
        },
        transcript: String,
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    videoKeywords: [String],
    transcription: {
      type: String,
      default: null,
    },
    summary: {
      type: String,
      default: null,
    },
    actionItems: [String],
    rating: {
      score: {
        type: Number,
        min: 1,
        max: 5,
        default: null,
      },
      feedback: String,
    },
    notes: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Session", sessionSchema);
