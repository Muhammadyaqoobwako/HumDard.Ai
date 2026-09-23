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

    if (!userMessage?.trim()) {
      return res.status(400).json({ message: "Please provide a message" });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({
        message: "AI is not configured. Add OPENAI_API_KEY to backend/.env.",
      });
    }

    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content:
              "You are HumDard AI, a warm and practical wellbeing assistant. Answer the user's actual question, not just their detected emotion. Be concise, empathetic, and never claim to be a doctor. For immediate danger or self-harm, encourage contacting local emergency services and a trusted person.",
          },
          {
            role: "user",
            content: `User emotion context: ${JSON.stringify(
              emotionalContext || {},
            )}\n\nUser question: ${userMessage.trim()}`,
          },
        ],
      }),
    });

    const responseData = await aiResponse.json();
    if (!aiResponse.ok) {
      return res.status(502).json({
        message: responseData.error?.message || "AI provider request failed",
      });
    }

    const content = responseData.choices?.[0]?.message?.content?.trim();
    if (!content) {
      return res.status(502).json({ message: "AI returned an empty response" });
    }

    let aiMessage = null;
    if (sessionId) {
      aiMessage = await Message.create({
        sessionId,
        senderId: null,
        senderType: "ai",
        messageType: "text",
        content,
        aiResponse: {
          isAIGenerated: true,
          aiModel: process.env.OPENAI_MODEL || "gpt-4o-mini",
        },
      });

      await Session.findByIdAndUpdate(sessionId, {
        $push: { messages: aiMessage._id },
      });
    }

    res.status(201).json({
      message: "AI response generated",
      data: aiMessage || {
        content,
        senderType: "ai",
        aiResponse: { isAIGenerated: true },
      },
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
