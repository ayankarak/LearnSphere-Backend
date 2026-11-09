
import Course from "../models/course.model.js";
import {
    BadRequestError,
    NotFoundError
} from "../utils/AppError.js";

// GET ALL COURSES
export const getAllCourses = async (req, res) => {
    const courses = await Course.findAll();

    res.status(200).json({
        success: true,
        message: "Courses fetched successfully",
        courses
    });
};

// GET COURSE BY ID
export const getCourseById = async (req, res) => {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        throw new BadRequestError("Invalid course ID");
    }

    const course = await Course.findByPk(id);

    if (!course) {
        throw new NotFoundError("Course not found");
    }

    res.status(200).json({
        success: true,
        message: "Course fetched successfully",
        course
    });
};

// CREATE COURSE
export const createCourse = async (req, res) => {
    const course = await Course.create(req.body);

    res.status(201).json({
        success: true,
        message: "Course created successfully",
        course
    });
};

// UPDATE COURSE
export const updateCourse = async (req, res) => {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        throw new BadRequestError("Invalid course ID");
    }

    const course = await Course.findByPk(id);

    if (!course) {
        throw new NotFoundError("Course not found");
    }

    await course.update(req.body);

    res.status(200).json({
        success: true,
        message: "Course updated successfully",
        course
    });
};

// DELETE COURSE
export const deleteCourse = async (req, res) => {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        throw new BadRequestError("Invalid course ID");
    }

    const course = await Course.findByPk(id);

    if (!course) {
        throw new NotFoundError("Course not found");
    }

    await course.destroy();

    res.status(200).json({
        success: true,
        message: "Course deleted successfully"
    });
};
