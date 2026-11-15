
import express from "express";

import { chatWithAI } from "../controllers/aiAssistant.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post( "/chat", authMiddleware, chatWithAI );

export default router;
