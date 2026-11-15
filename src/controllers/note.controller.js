
import { Note, Course, Lesson, Enrollment } from "../models/associations.js";

import { createNoteSchema, updateNoteSchema } from "../validators/note.validator.js";

import { BadRequestError, NotFoundError } from "../utils/AppError.js";

// CREATE NOTE
export const createNote = async (req, res) => {
    const validation = createNoteSchema.safeParse(req.body);

    if (!validation.success) {
        throw new BadRequestError(
            validation.error.issues[0].message
        );
    }

    const { lessonId, title, content } = validation.data;
    const userId = req.user.id;

    // FIND LESSON
    const lesson = await Lesson.findByPk(lessonId);

    if (!lesson) {
        throw new NotFoundError("Lesson not found");
    }

    const courseId = lesson.courseId;

    // CHECK ENROLLMENT
    const enrollment = await Enrollment.findOne({
        where: { userId, courseId }
    });

    if (!enrollment) {
        throw new BadRequestError(
            "You must enroll in this course first"
        );
    }

    // CHECK EXISTING NOTE
    const existingNote = await Note.findOne({
        where: {
            userId,
            lessonId
        }
    });

    if (existingNote) {
        throw new BadRequestError(
            "A note already exists for this lesson. Please update it."
        );
    }

    // CREATE NOTE
    const note = await Note.create({
        userId,
        courseId,
        lessonId,
        title,
        content
    });

    res.status(201).json({
        success: true,
        message: "Note created successfully",
        note
    });
};


// GET ALL USER NOTES
export const getMyNotes = async (req, res) => {
    const userId = req.user.id;

    const notes = await Note.findAll({
        where: { userId },
        include: [
            {
                model: Course,
                as: "course",
                attributes: ["id", "title"]
            },
            {
                model: Lesson,
                as: "lesson",
                attributes: ["id", "title"]
            }
        ],
        order: [["updatedAt", "DESC"]]
    });

    res.status(200).json({
        success: true,
        count: notes.length,
        notes
    });
};


// GET NOTES BY LESSON
export const getNoteByLesson = async (req, res) => {
    const userId = req.user.id;
    const lessonId = Number(req.params.lessonId);

    const note = await Note.findOne({
        where: {
            userId,
            lessonId
        }
    });

    res.status(200).json({
        success: true,
        note: note || null
    });
};


// GET SINGLE NOTE
export const getNoteById = async (req, res) => {
    const userId = req.user.id;
    const noteId = Number(req.params.id);

    const note = await Note.findOne({
        where: {
            id: noteId,
            userId
        },
        include: [
            {
                model: Course,
                as: "course",
                attributes: ["id", "title"]
            },
            {
                model: Lesson,
                as: "lesson",
                attributes: ["id", "title"]
            }
        ]
    });

    if (!note) {
        throw new NotFoundError("Note not found");
    }

    res.status(200).json({
        success: true,
        note
    });
};


// UPDATE NOTE
export const updateNote = async (req, res) => {
    const validation = updateNoteSchema.safeParse(req.body);

    if (!validation.success) {
        throw new BadRequestError(
            validation.error.issues[0].message
        );
    }

    const userId = req.user.id;
    const noteId = Number(req.params.id);

    const note = await Note.findOne({
        where: {
            id: noteId,
            userId
        }
    });

    if (!note) {
        throw new NotFoundError("Note not found");
    }

    await note.update(validation.data);

    res.status(200).json({
        success: true,
        message: "Note updated successfully",
        note
    });
};


// DELETE NOTE
export const deleteNote = async (req, res) => {
    const userId = req.user.id;
    const noteId = Number(req.params.id);

    const note = await Note.findOne({
        where: {
            id: noteId,
            userId
        }
    });

    if (!note) {
        throw new NotFoundError("Note not found");
    }

    await note.destroy();

    res.status(200).json({
        success: true,
        message: "Note deleted successfully"
    });
};
