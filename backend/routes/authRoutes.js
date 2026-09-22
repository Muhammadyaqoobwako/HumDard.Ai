import express from "express";
import {
  signup,
  login,
  getCurrentUser,
  updateProfile,
  logout,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", verifyToken, getCurrentUser);
router.put("/profile", verifyToken, updateProfile);
router.post("/logout", verifyToken, logout);

export default router;
