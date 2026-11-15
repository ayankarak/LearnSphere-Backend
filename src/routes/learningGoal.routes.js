
import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import { getLearningGoals, createLearningGoal } from "../controllers/learningGoal.controller.js";

const router = express.Router();

// GET TODAY AND TOMORROW GOALS
router.get("/", authMiddleware, getLearningGoals);

// CREATE OR UPDATE GOAL
router.post("/", authMiddleware, createLearningGoal);

export default router;
