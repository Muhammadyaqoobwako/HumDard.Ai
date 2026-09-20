import express from "express";
import {
  startSession,
  endSession,
  getSessionHistory,
  getSessionDetails,
  logEmotion,
  getEmotionTrends,
} from "../controllers/sessionController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/start", verifyToken, startSession);
router.post("/:sessionId/end", verifyToken, endSession);
router.get("/history", verifyToken, getSessionHistory);
router.get("/:sessionId", verifyToken, getSessionDetails);
router.post("/:sessionId/emotion", verifyToken, logEmotion);
router.get("/analytics/trends", verifyToken, getEmotionTrends);

export default router;
