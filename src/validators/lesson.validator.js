import { z } from "zod";

// Create Lesson Validation
export const createLessonSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Lesson title must be at least 3 characters")
    .max(255, "Lesson title cannot exceed 255 characters"),

  description: z
    .string()
    .trim()
    .optional()
    .nullable(),

  videoUrl: z
    .string()
    .trim()
    .url("Please provide a valid video URL")
    .optional()
    .nullable(),

  duration: z.coerce
    .number()
    .int()
    .positive("Duration must be greater than 0")
    .optional()
    .nullable(),

  position: z.coerce
    .number()
    .int()
    .positive("Position must be greater than 0")
    .optional(),

  isPreview: z
    .boolean()
    .optional(),
});

// Update Lesson Validation
export const updateLessonSchema = createLessonSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least one field is required"
  );