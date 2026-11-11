import { Course, Lesson } from "../models/associations.js";

import {createLessonSchema, updateLessonSchema} from "../validators/lesson.validator.js";

// Create Lesson
export const createLesson = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const validatedData = createLessonSchema.parse(req.body);

    // Check whether course exists
    const course = await Course.findByPk(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Create lesson under the course
    const lesson = await Lesson.create({
      ...validatedData,
      courseId,
    });

    res.status(201).json({
      success: true,
      message: "Lesson created successfully",
      lesson,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Lessons of a Course
export const getLessonsByCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findByPk(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const lessons = await Lesson.findAll({
      where: { courseId },
      order: [["position", "ASC"]],
    });

    res.status(200).json({
      success: true,
      count: lessons.length,
      lessons,
    });
  } catch (error) {
    next(error);
  }
};

// Get Lesson By ID
export const getLessonById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const lesson = await Lesson.findByPk(id, {
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["id", "title"],
        },
      ],
    });

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    res.status(200).json({
      success: true,
      lesson,
    });
  } catch (error) {
    next(error);
  }
};

// Update Lesson
export const updateLesson = async (req, res, next) => {
  try {
    const { id } = req.params;

    const validatedData = updateLessonSchema.parse(req.body);

    const lesson = await Lesson.findByPk(id);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    await lesson.update(validatedData);

    res.status(200).json({
      success: true,
      message: "Lesson updated successfully",
      lesson,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Lesson
export const deleteLesson = async (req, res, next) => {
  try {
    const { id } = req.params;

    const lesson = await Lesson.findByPk(id);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    await lesson.destroy();

    res.status(200).json({
      success: true,
      message: "Lesson deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};