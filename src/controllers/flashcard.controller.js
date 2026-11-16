
import {
    Course,
    Lesson,
    Enrollment,
    FlashcardSet,
    Flashcard
} from "../models/associations.js";

import sequelize from "../config/database.js";

import {
    BadRequestError,
    NotFoundError,
    ForbiddenError
} from "../utils/AppError.js";

import { generateFlashcardsSchema } from "../validators/flashcard.validator.js";

import {
    generateFlashcardsWithAI
} from "../services/flashcard.service.js";

// Generate Flashcards
export const generateFlashcards = async (req, res, next) => {
    const transaction = await sequelize.transaction();

    try {
        const lessonId = Number(req.params.lessonId);

        const validation = generateFlashcardsSchema.safeParse({
            lessonId
        });

        if (!validation.success) {
            throw new BadRequestError(
                validation.error.issues[0].message
            );
        }

        const lesson = await Lesson.findByPk(lessonId, {
            transaction
        });

        if (!lesson) {
            throw new NotFoundError("Lesson not found");
        }

        const course = await Course.findByPk(lesson.courseId, {
            transaction
        });

        if (!course) {
            throw new NotFoundError("Course not found");
        }

        const enrollment = await Enrollment.findOne({
            where: {
                userId: req.user.id,
                courseId: lesson.courseId
            },
            transaction
        });

        if (!enrollment) {
            throw new ForbiddenError(
                "You are not enrolled in this course"
            );
        }

        // Check existing FlashcardSet
        const existingSet = await FlashcardSet.findOne({
            where: { lessonId },
            include: [
                {
                    model: Flashcard,
                    as: "flashcards"
                }
            ],
            transaction
        });

        if (existingSet) {
            await transaction.commit();

            return res.status(200).json({
                success: true,
                message: "Flashcards fetched successfully",
                data: existingSet
            });
        }

        // Generate Flashcards using Gemini
        const generatedCards =
            await generateFlashcardsWithAI(lesson);

        // Create FlashcardSet
        const flashcardSet = await FlashcardSet.create(
            {
                lessonId,
                generatedAt: new Date()
            },
            { transaction }
        );

        // Save generated Flashcards
        const flashcards = generatedCards.map((card, index) => ({
            flashcardSetId: flashcardSet.id,
            question: card.question.trim(),
            answer: card.answer.trim(),
            position: index + 1
        }));

        await Flashcard.bulkCreate(flashcards, {
            transaction
        });

        // Fetch complete FlashcardSet
        const result = await FlashcardSet.findByPk(
            flashcardSet.id,
            {
                include: [
                    {
                        model: Flashcard,
                        as: "flashcards"
                    }
                ],
                transaction
            }
        );

        await transaction.commit();

        return res.status(201).json({
            success: true,
            message: "Flashcards generated successfully",
            data: result
        });

    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};


// Get Flashcards
export const getFlashcards = async (req, res, next) => {
    try {
        const lessonId = Number(req.params.lessonId);

        const validation = generateFlashcardsSchema.safeParse({
            lessonId
        });

        if (!validation.success) {
            throw new BadRequestError(
                validation.error.issues[0].message
            );
        }

        const lesson = await Lesson.findByPk(lessonId);

        if (!lesson) {
            throw new NotFoundError("Lesson not found");
        }

        const enrollment = await Enrollment.findOne({
            where: {
                userId: req.user.id,
                courseId: lesson.courseId
            }
        });

        if (!enrollment) {
            throw new ForbiddenError(
                "You are not enrolled in this course"
            );
        }

        const flashcardSet = await FlashcardSet.findOne({
            where: { lessonId },
            include: [
                {
                    model: Flashcard,
                    as: "flashcards"
                }
            ],
            order: [
                [
                    { model: Flashcard, as: "flashcards" },
                    "position",
                    "ASC"
                ]
            ]
        });

        if (!flashcardSet) {
            return res.status(200).json({
                success: true,
                message: "Flashcards have not been generated yet",
                data: null
            });
        }

        return res.status(200).json({
            success: true,
            message: "Flashcards fetched successfully",
            data: flashcardSet
        });

    } catch (error) {
        next(error);
    }
};
