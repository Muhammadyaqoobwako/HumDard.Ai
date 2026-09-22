import mongoose from "mongoose";

const emotionAnalysisSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    detectedEmotion: {
      type: String,
      enum: ["happy", "sad", "anxious", "confident", "neutral", "angry", "surprised"],
      required: true,
    },
    intensity: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    confidence: {
      type: Number,
      min: 0,
      max: 1,
      required: true,
    },
    source: {
      type: String,
      enum: ["text-analysis", "voice-analysis", "keyword-detection"],
      default: "text-analysis",
    },
    transcript: String,
    keywords: [String],
    suggestedResponses: [String],
    videoTriggered: {
      type: String,
      default: null,
    },
    userReaction: {
      type: String,
      enum: ["helpful", "not-helpful", "neutral"],
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("EmotionAnalysis", emotionAnalysisSchema);
