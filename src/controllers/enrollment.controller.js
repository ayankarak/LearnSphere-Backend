
import { Enrollment, Course, Category } from "../models/associations.js";

import { enrollCourseSchema } from "../validators/enrollment.validator.js";

import {
  BadRequestError,
  NotFoundError,
} from "../utils/AppError.js";

// ENROLL IN A COURSE
export const enrollCourse = async (req, res) => {
  // Validate courseId from URL params
  const validation = enrollCourseSchema.safeParse({
    courseId: req.params.courseId,
  });

  if (!validation.success) {
    throw new BadRequestError(
      validation.error.issues[0].message
    );
  }

  const { courseId } = validation.data;
  const userId = req.user.id;

  // Check whether course exists
  const course = await Course.findByPk(courseId);

  if (!course) {
    throw new NotFoundError("Course not found");
  }

  // Check existing enrollment
  const existingEnrollment = await Enrollment.findOne({
    where: {
      userId,
      courseId,
    },
  });

  if (existingEnrollment) {
    throw new BadRequestError(
      "You are already enrolled in this course"
    );
  }

  // Create enrollment
  const enrollment = await Enrollment.create({
    userId,
    courseId,
  });

  res.status(201).json({
    success: true,
    message: "Successfully enrolled in course",
    enrollment,
  });
};

// GET MY ENROLLED COURSES
export const getMyEnrollments = async (req, res) => {
  const userId = req.user.id;

  const enrollments = await Enrollment.findAll({
    where: {
      userId,
    },
    include: [
      {
        model: Course,
        as: "course",
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["id", "name", "slug"],
          },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  res.status(200).json({
    success: true,
    message: "Enrolled courses fetched successfully",
    enrollments,
  });
};
