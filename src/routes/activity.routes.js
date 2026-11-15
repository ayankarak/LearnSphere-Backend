
import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import { saveActivity, getWeeklyActivity } from "../controllers/activity.controller.js";

const router = express.Router();

router.post("/heartbeat", authMiddleware, saveActivity);

router.get("/weekly", authMiddleware, getWeeklyActivity);

export default router;
