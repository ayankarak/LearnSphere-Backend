
import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import { completeLesson, getCourseProgress, getCompletedLessons } from "../controllers/progress.controller.js";

const router = express.Router();

// MARK LESSON AS COMPLETED
router.patch( "/lesson/:lessonId/complete", authMiddleware, completeLesson );

// GET COURSE PROGRESS
router.get( "/course/:courseId", authMiddleware, getCourseProgress );

router.get( "/course/:courseId/completed-lessons", authMiddleware, getCompletedLessons );

export default router;
