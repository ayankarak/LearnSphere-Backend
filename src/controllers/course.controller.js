import Course from "../models/course.model.js";
import { NotFoundError } from "../utils/AppError.js";

export const getAllCourses = async (req, res) => {
    const courses = await Course.find();

    res.status(200).json({
        message: "Courses fetched successfully",
        courses
    });
};

export const getCourseById = async (req, res, next) => {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
        throw new NotFoundError("Course not found");
    }

    res.status(200).json({
        message: "Course fetched successfully",
        course
    });
};

export const createCourse = async (req, res) => {
    const { title, description, price, instructor } = req.body;
    const course = new Course({ title, description, price, instructor });
    await course.save();
    res.status(201).json({
        message: "Course created successfully",
        course
    });
};

export const updateCourse = async (req, res) => {
    const { id } = req.params;

    const updatedCourse = await Course.findByIdAndUpdate(
        id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    res.status(200).json({
        message: "Course updated successfully",
        course: updatedCourse
    });
};

export const deleteCourse = async (req, res) => {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);

    res.status(200).json({
        message: "Course deleted successfully",
        course: deletedCourse
    });
};

