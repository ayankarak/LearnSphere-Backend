import Course from "../models/course.model.js";
import { BadRequestError, NotFoundError } from "../utils/AppError.js";

export const getAllCourses = async (req, res) => {
    const courses = await Course.find();

    res.status(200).json({
        message: "Courses fetched successfully",
        courses
    });
};

const getCourseById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const course = await Course.findById(id);

        if (!course) {
            throw new NotFoundError("Course not found");
        }

        res.status(200).json({
            message: "Course fetched successfully",
            course
        });
    } catch (error) {
        if (error.name === "CastError") {
            return next(new BadRequestError("Invalid course ID"));
        }

        next(error);
    }
};

const createCourse = async (req, res, next) => {
    try {
        const { title, description, price, instructor } = req.body;

        const course = new Course({
            title,
            description,
            price,
            instructor
        });

        await course.save();

        res.status(201).json({
            message: "Course created successfully",
            course
        });
    } catch (error) {
        next(error);
    }
};

const updateCourse = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedCourse) {
            throw new NotFoundError("Course not found");
        }

        res.status(200).json({
            message: "Course updated successfully",
            course: updatedCourse
        });
    } catch (error) {
        if (error.name === "CastError") {
            return next(new BadRequestError("Invalid course ID"));
        }

        next(error);
    }
};

const deleteCourse = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedCourse = await Course.findByIdAndDelete(id);

        if (!deletedCourse) {
            throw new NotFoundError("Course not found");
        }

        res.status(200).json({
            message: "Course deleted successfully",
            course: deletedCourse
        });
    } catch (error) {
        if (error.name === "CastError") {
            return next(new BadRequestError("Invalid course ID"));
        }

        next(error);
    }
};

