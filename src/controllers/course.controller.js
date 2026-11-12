import { Course, Category, Lesson } from "../models/associations.js";

import {
  createCourseSchema,
  updateCourseSchema,
} from "../validators/course.validator.js";

import {
  BadRequestError,
  NotFoundError,
} from "../utils/AppError.js";

// GET ALL COURSES
export const getAllCourses = async (req, res) => {
  const courses = await Course.findAll({
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["id", "name", "slug"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  res.status(200).json({
    success: true,
    message: "Courses fetched successfully",
    courses,
  });
};


export const getCourseById = async (req, res) => {
  const { id } = req.params;

  const course = await Course.findByPk(id, {
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["id", "name", "slug"],
      },
      {
        model: Lesson,
        as: "lessons",
        attributes: [
          "id",
          "title",
          "description",
          "duration",
          "position",
          "isPreview",
        ],
      },
    ],
    order: [
      [{ model: Lesson, as: "lessons" }, "position", "ASC"],
    ],
  });

  if (!course) {
    throw new NotFoundError("Course not found");
  }

  res.status(200).json({
    success: true,
    message: "Course fetched successfully",
    course,
  });
};


// CREATE COURSE
export const createCourse = async (req, res) => {
  const validation = createCourseSchema.safeParse(req.body);

  if (!validation.success) {
    throw new BadRequestError(
      validation.error.issues[0].message
    );
  }

  const validatedData = validation.data;

  // Check whether the category exists
  if (validatedData.categoryId != null) {
    const category = await Category.findByPk(
      validatedData.categoryId
    );

    if (!category) {
      throw new NotFoundError("Category not found");
    }
  }

  const course = await Course.create(validatedData);

  res.status(201).json({
    success: true,
    message: "Course created successfully",
    course,
  });
};

// UPDATE COURSE
export const updateCourse = async (req, res) => {
  const { id } = req.params;

  const course = await Course.findByPk(id);

  if (!course) {
    throw new NotFoundError("Course not found");
  }

  const validation = updateCourseSchema.safeParse(req.body);

  if (!validation.success) {
    throw new BadRequestError(
      validation.error.issues[0].message
    );
  }

  const validatedData = validation.data;

  // Check whether the new category exists
  if (validatedData.categoryId != null) {
    const category = await Category.findByPk(
      validatedData.categoryId
    );

    if (!category) {
      throw new NotFoundError("Category not found");
    }
  }

  await course.update(validatedData);

  res.status(200).json({
    success: true,
    message: "Course updated successfully",
    course,
  });
};

// DELETE COURSE
export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  const course = await Course.findByPk(id);

  if (!course) {
    throw new NotFoundError("Course not found");
  }

  await course.destroy();

  res.status(200).json({
    success: true,
    message: "Course deleted successfully",
  });
};
