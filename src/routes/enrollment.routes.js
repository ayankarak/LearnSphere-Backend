
import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  enrollCourse,
  getMyEnrollments,
} from "../controllers/enrollment.controller.js";

const router = express.Router();

// Enroll in a course
router.post( "/course/:courseId", authMiddleware, enrollCourse );

// Get logged-in user's enrolled courses
router.get("/my-courses", authMiddleware, getMyEnrollments );

export default router;
