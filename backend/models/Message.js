import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.senderType !== "ai";
      },
    },
    senderType: {
      type: String,
      enum: ["user", "ai", "expert"],
      default: "user",
    },
    messageType: {
      type: String,
      enum: ["text", "voice", "video", "system"],
      default: "text",
    },
    content: {
      type: String,
      required: true,
    },
    mediaUrl: {
      type: String,
      default: null,
    },
    emotionalContext: {
      detectedEmotion: String,
      emotionIntensity: {
        type: Number,
        min: 1,
        max: 10,
      },
      keywords: [String],
    },
    aiResponse: {
      isAIGenerated: {
        type: Boolean,
        default: false,
      },
      aiModel: {
        type: String,
        default: null,
      },
      confidence: {
        type: Number,
        min: 0,
        max: 1,
      },
    },
    reactions: {
      type: Map,
      of: Number,
      default: {},
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    editedAt: {
      type: Date,
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

export default mongoose.model("Message", messageSchema);
