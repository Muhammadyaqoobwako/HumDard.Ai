import Message from "../models/Message.js";
import Session from "../models/Session.js";

export const sendMessage = async (req, res) => {
  try {
    const { sessionId, content, messageType } = req.body;

    const message = await Message.create({
      sessionId,
      senderId: req.userId,
      senderType: "user",
      messageType: messageType || "text",
      content,
    });

    // Add message to session
    await Session.findByIdAndUpdate(sessionId, {
      $push: { messages: message._id },
    });

    res.status(201).json({
      message: "Message sent",
      data: message,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSessionMessages = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { page = 1, limit = 50 } = req.query;
    const skip = (page - 1) * limit;

    const messages = await Message.find({ sessionId })
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("senderId", "fullName avatar");

    const total = await Message.countDocuments({ sessionId });

    res.status(200).json({
      messages,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const generateAIResponse = async (req, res) => {
  try {
    const { sessionId, userMessage, emotionalContext } = req.body;

    // This is a placeholder - integrate with actual AI service
    const responses = {
      sad: "I hear you. Let us break this challenge into one small next step.",
      anxious:
        "That sounds heavy. Take a deep breath, then tell me the hardest part first.",
      happy:
        "That's wonderful to hear! What made you feel this way?",
      neutral:
        "Thank you for sharing. I'm here to listen and help.",
    };

    const aiMessage = await Message.create({
      sessionId,
      senderId: null,
      senderType: "ai",
      messageType: "text",
      content: responses[emotionalContext?.emotion] || responses.neutral,
      aiResponse: {
        isAIGenerated: true,
        confidence: 0.85,
      },
    });

    // Add to session
    await Session.findByIdAndUpdate(sessionId, {
      $push: { messages: aiMessage._id },
    });

    res.status(201).json({
      message: "AI response generated",
      data: aiMessage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findByIdAndDelete(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchMessages = async (req, res) => {
  try {
    const { query, sessionId } = req.query;

    const messages = await Message.find({
      $and: [
        { sessionId },
        { $text: { $search: query } },
      ],
    }).select("content senderId createdAt");

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
