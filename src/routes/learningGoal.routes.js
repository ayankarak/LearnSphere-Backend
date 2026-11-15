
import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import { getLearningGoals, createLearningGoalTask, updateLearningGoalTask, deleteLearningGoalTask } from "../controllers/learningGoal.controller.js";

const router = express.Router();

// GET TODAY AND TOMORROW GOALS
router.get("/", authMiddleware, getLearningGoals);

// ADD TASK
router.post("/tasks", authMiddleware, createLearningGoalTask);

// UPDATE TASK
router.patch("/tasks/:taskId", authMiddleware, updateLearningGoalTask);

// DELETE TASK
router.delete("/tasks/:taskId", authMiddleware, deleteLearningGoalTask);

export default router;
