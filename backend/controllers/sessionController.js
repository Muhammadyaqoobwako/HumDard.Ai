import Session from "../models/Session.js";
import Message from "../models/Message.js";
import EmotionAnalysis from "../models/EmotionAnalysis.js";
import User from "../models/User.js";

export const startSession = async (req, res) => {
  try {
    const { topic, sessionType } = req.body;

    const session = await Session.create({
      userId: req.userId,
      topic: topic || "general",
      sessionType: sessionType || "voice",
      status: "ongoing",
    });

    res.status(201).json({
      message: "Session started",
      sessionId: session._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const endSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { summary, actionItems, rating, feedback } = req.body;

    const session = await Session.findByIdAndUpdate(
      sessionId,
      {
        status: "completed",
        endTime: new Date(),
        durationMinutes: Math.round(
          (new Date() - new Date(session.startTime)) / 60000
        ),
        summary,
        actionItems,
        "rating.score": rating,
        "rating.feedback": feedback,
      },
      { new: true }
    );

    // Update user session count and duration
    await User.findByIdAndUpdate(req.userId, {
      $inc: {
        sessionCount: 1,
        totalSessionMinutes: session.durationMinutes,
      },
    });

    res.status(200).json({
      message: "Session ended successfully",
      session,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSessionHistory = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const sessions = await Session.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Session.countDocuments({ userId: req.userId });

    res.status(200).json({
      sessions,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSessionDetails = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findById(sessionId)
      .populate("userId", "fullName email avatar")
      .populate("messages");

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json({ session });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logEmotion = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { emotion, intensity, transcript, keywords } = req.body;

    const emotionLog = await EmotionAnalysis.create({
      sessionId,
      userId: req.userId,
      detectedEmotion: emotion,
      intensity,
      confidence: 0.85,
      transcript,
      keywords,
    });

    // Update session emotion log
    await Session.findByIdAndUpdate(sessionId, {
      $push: {
        emotionLog: {
          timestamp: new Date(),
          emotion,
          intensity,
          transcript,
        },
      },
    });

    res.status(201).json({
      message: "Emotion logged",
      emotionLog,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmotionTrends = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const trends = await EmotionAnalysis.aggregate([
      {
        $match: {
          userId: req.userId,
          timestamp: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: "$detectedEmotion",
          count: { $sum: 1 },
          avgIntensity: { $avg: "$intensity" },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({ trends });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
