
import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import { createNote, getMyNotes, getNoteById, updateNote, deleteNote,getNoteByLesson } from "../controllers/note.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createNote);
router.get("/", getMyNotes);
router.get("/:id", getNoteById);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
router.get("/lesson/:lessonId", getNoteByLesson);

export default router;
