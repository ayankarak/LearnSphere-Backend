import express from "express";

import { createLesson, getLessonsByCourse, getLessonById, updateLesson, deleteLesson } from "../controllers/lesson.controller.js";

const router = express.Router();

router.post("/course/:courseId", createLesson);
router.get("/course/:courseId", getLessonsByCourse);
router.get("/:id", getLessonById);
router.patch("/:id", updateLesson);
router.delete("/:id", deleteLesson);

export default router;