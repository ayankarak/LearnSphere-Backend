
import { z } from "zod";

export const aiChatSchema = z.object({
    courseId: z.coerce.number().int().positive().optional(),

    lessonId: z.coerce.number().int().positive().optional(),

    message: z.string()
        .trim()
        .min(1, "Message cannot be empty")
        .max(2000, "Message cannot exceed 2000 characters"),

    history: z.array(
        z.object({
            role: z.enum(["user", "model"]),
            content: z.string().min(1).max(4000)
        })
    )
    .max(20)
    .optional()
    .default([])
}).refine(
    (data) => !data.lessonId || data.courseId,
    {
        message: "Course ID is required when lesson ID is provided",
        path: ["courseId"]
    }
);
