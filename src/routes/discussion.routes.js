
import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import { createDiscussionPost, getCourseDiscussions, deleteDiscussionPost } from "../controllers/discussion.controller.js";

const router = express.Router();

// Get all discussions of a course
router.get( "/courses/:courseId", authMiddleware, getCourseDiscussions );

// Create discussion or reply
router.post( "/courses/:courseId", authMiddleware, createDiscussionPost );

// Delete discussion or reply
router.delete( "/:postId", authMiddleware, deleteDiscussionPost );

export default router;
