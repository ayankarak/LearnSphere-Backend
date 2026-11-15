
import { z } from "zod";

export const createNoteSchema = z.object({
    lessonId: z.coerce.number().int().positive(),

    title: z.string()
        .trim()
        .min(1, "Note title is required")
        .max(255, "Title cannot exceed 255 characters"),

    content: z.string()
        .trim()
        .min(1, "Note content is required")
});

export const updateNoteSchema = z.object({
    title: z.string()
        .trim()
        .min(1, "Note title is required")
        .max(255)
        .optional(),

    content: z.string()
        .trim()
        .min(1, "Note content is required")
        .optional()
}).refine(
    (data) => Object.keys(data).length > 0,
    "At least one field is required"
);
