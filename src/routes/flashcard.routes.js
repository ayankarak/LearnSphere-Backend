
import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import { generateFlashcards, getFlashcards } from "../controllers/flashcard.controller.js";

const router = express.Router();

// Generate flashcards for a lesson
router.post("/lessons/:lessonId/generate", authMiddleware, generateFlashcards );

// Get existing flashcards for a lesson
router.get( "/lessons/:lessonId", authMiddleware, getFlashcards );

export default router;
