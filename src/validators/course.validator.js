import {z} from 'zod';

export const createCourseSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(0, "Price cannot be negative"),
    instructor: z.string().min(1, "Instructor is required")
});