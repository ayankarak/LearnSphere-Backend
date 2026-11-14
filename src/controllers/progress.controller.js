import { LessonProgress, Lesson, Course, Enrollment } from "../models/associations.js";

import { completeLessonSchema } from "../validators/progress.validator.js";

import { BadRequestError, NotFoundError } from "../utils/AppError.js";

// MARK LESSON AS COMPLETED
export const completeLesson = async (req, res) => {

    const validation = completeLessonSchema.safeParse({
        lessonId: req.params.lessonId
    });

    if (!validation.success) {
        throw new BadRequestError(
            validation.error.issues[0].message
        );
    }

    const { lessonId } = validation.data;
    const userId = req.user.id;

    const lesson = await Lesson.findByPk(lessonId);

    if (!lesson) {
        throw new NotFoundError("Lesson not found");
    }

    const enrollment = await Enrollment.findOne({
        where: {
            userId,
            courseId: lesson.courseId
        }
    });

    if (!enrollment) {
        throw new BadRequestError(
            "You must enroll in this course first"
        );
    }

    let progress = await LessonProgress.findOne({
        where: {
            userId,
            lessonId
        }
    });

    if (!progress) {
        progress = await LessonProgress.create({
            userId,
            courseId: lesson.courseId,
            lessonId,
            isCompleted: true,
            completedAt: new Date()
        });
    } else {
        progress.isCompleted = true;
        progress.completedAt = new Date();

        await progress.save();
    }

    res.status(200).json({
        success: true,
        message: "Lesson marked as completed",
        progress
    });
};


// GET COURSE PROGRESS
export const getCourseProgress = async (req, res) => {

    const courseId = Number(req.params.courseId);
    const userId = req.user.id;

    const course = await Course.findByPk(courseId);

    if (!course) {
        throw new NotFoundError("Course not found");
    }

    const enrollment = await Enrollment.findOne({
        where: {
            userId,
            courseId
        }
    });

    if (!enrollment) {
        throw new BadRequestError(
            "You are not enrolled in this course"
        );
    }

    const totalLessons = await Lesson.count({
        where: { courseId }
    });

    const completedLessons = await LessonProgress.count({
        where: {
            userId,
            courseId,
            isCompleted: true
        }
    });

    const percentage = totalLessons === 0
        ? 0
        : Math.round((completedLessons / totalLessons) * 100);

    res.status(200).json({
        success: true,
        progress: {
            courseId,
            totalLessons,
            completedLessons,
            percentage
        }
    });
};


export const getCompletedLessons = async (req, res) => {
    const courseId = Number(req.params.courseId);
    const userId = req.user.id;

    const course = await Course.findByPk(courseId);

    if (!course) {
        throw new NotFoundError("Course not found");
    }

    const enrollment = await Enrollment.findOne({
        where: { userId, courseId }
    });

    if (!enrollment) {
        throw new BadRequestError(
            "You are not enrolled in this course"
        );
    }

    const completedLessons = await LessonProgress.findAll({
        where: {
            userId,
            courseId,
            isCompleted: true
        },
        attributes: ["lessonId", "completedAt"]
    });

    res.status(200).json({
        success: true,
        completedLessons
    });
};