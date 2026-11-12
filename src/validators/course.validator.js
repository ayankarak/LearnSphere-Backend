
import { z } from "zod";

// CREATE COURSE VALIDATION
export const createCourseSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Course title must contain at least 3 characters"),

    description: z
        .string()
        .trim()
        .min(10, "Description must contain at least 10 characters"),

    price: z.coerce
        .number()
        .positive("Price must be greater than zero"),

    instructor: z
        .string()
        .trim()
        .min(3, "Instructor name must contain at least 3 characters"),

    categoryId: z.union([
        z.coerce.number().int().positive(),
        z.null()
    ]).optional()
});

// UPDATE COURSE VALIDATION
export const updateCourseSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Course title must contain at least 3 characters")
        .optional(),

    description: z
        .string()
        .trim()
        .min(10, "Description must contain at least 10 characters")
        .optional(),

    price: z.coerce
        .number()
        .positive("Price must be greater than zero")
        .optional(),

    instructor: z
        .string()
        .trim()
        .min(3, "Instructor name must contain at least 3 characters")
        .optional(),

    categoryId: z.union([
        z.coerce.number().int().positive(),
        z.null()
    ]).optional()
}).refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "At least one field is required for updating a course"
    }
);
