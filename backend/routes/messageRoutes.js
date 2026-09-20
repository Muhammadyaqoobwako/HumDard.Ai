import express from "express";
import {
  sendMessage,
  getSessionMessages,
  generateAIResponse,
  deleteMessage,
  searchMessages,
} from "../controllers/messageController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/send", verifyToken, sendMessage);
router.get("/:sessionId", verifyToken, getSessionMessages);
router.post("/ai-response", verifyToken, generateAIResponse);
router.delete("/:messageId", verifyToken, deleteMessage);
router.get("/search", verifyToken, searchMessages);

export default router;
