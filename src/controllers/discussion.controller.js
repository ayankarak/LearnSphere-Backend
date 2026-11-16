
import { Course, Enrollment, DiscussionPost } from "../models/associations.js";

import { BadRequestError, NotFoundError, ForbiddenError } from "../utils/AppError.js";

// CREATE DISCUSSION OR REPLY
export const createDiscussionPost = async (req, res, next) => {
    try {
        const courseId = Number(req.params.courseId);
        const { content, parentId } = req.body;

        if (!Number.isInteger(courseId) || courseId <= 0) {
            throw new BadRequestError("Invalid course ID");
        }

        if (
            typeof content !== "string" ||
            !content.trim()
        ) {
            throw new BadRequestError("Content is required");
        }

        const course = await Course.findByPk(courseId);

        if (!course) {
            throw new NotFoundError("Course not found");
        }

        const enrollment = await Enrollment.findOne({
            where: {
                userId: req.user.id,
                courseId
            }
        });

        if (!enrollment) {
            throw new ForbiddenError(
                "You are not enrolled in this course"
            );
        }

        // CHECK PARENT POST IF IT IS A REPLY
        if (parentId !== undefined && parentId !== null) {
            const parentPost = await DiscussionPost.findOne({
                where: {
                    id: parentId,
                    courseId,
                    parentId: null
                }
            });

            if (!parentPost) {
                throw new NotFoundError(
                    "Parent discussion not found"
                );
            }
        }

        const post = await DiscussionPost.create({
            courseId,
            userId: req.user.id,
            parentId: parentId || null,
            content: content.trim()
        });

        return res.status(201).json({
            success: true,
            message: parentId
                ? "Reply added successfully"
                : "Discussion created successfully",
            data: post
        });

    } catch (error) {
        next(error);
    }
};


// GET COURSE DISCUSSIONS
export const getCourseDiscussions = async (req, res, next) => {
    try {
        const courseId = Number(req.params.courseId);

        if (!Number.isInteger(courseId) || courseId <= 0) {
            throw new BadRequestError("Invalid course ID");
        }

        const course = await Course.findByPk(courseId);

        if (!course) {
            throw new NotFoundError("Course not found");
        }

        const enrollment = await Enrollment.findOne({
            where: {
                userId: req.user.id,
                courseId
            }
        });

        if (!enrollment) {
            throw new ForbiddenError(
                "You are not enrolled in this course"
            );
        }

        const discussions = await DiscussionPost.findAll({
            where: {
                courseId,
                parentId: null
            },
            include: [
                {
                    model: DiscussionPost,
                    as: "replies",
                    include: [
                        {
                            association: "author",
                            attributes: ["id", "name"]
                        }
                    ]
                },
                {
                    association: "author",
                    attributes: ["id", "name"]
                }
            ],
            order: [
                ["createdAt", "DESC"],
                [
                    { model: DiscussionPost, as: "replies" },
                    "createdAt",
                    "ASC"
                ]
            ]
        });

        return res.status(200).json({
            success: true,
            message: "Discussions fetched successfully",
            data: discussions
        });

    } catch (error) {
        next(error);
    }
};


// DELETE DISCUSSION OR REPLY
export const deleteDiscussionPost = async (req, res, next) => {
    try {
        const postId = Number(req.params.postId);

        if (!Number.isInteger(postId) || postId <= 0) {
            throw new BadRequestError("Invalid post ID");
        }

        const post = await DiscussionPost.findByPk(postId);

        if (!post) {
            throw new NotFoundError("Discussion post not found");
        }

        if (post.userId !== req.user.id) {
            throw new ForbiddenError(
                "You can only delete your own posts"
            );
        }

        await post.destroy();

        return res.status(200).json({
            success: true,
            message: "Discussion deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};
