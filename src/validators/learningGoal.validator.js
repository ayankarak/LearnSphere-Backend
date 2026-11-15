
import { z } from "zod";

export const createLearningGoalSchema = z.object({
    goalDate: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid goal date format"),

    targetLessons: z.coerce.number()
        .int("Target lessons must be an integer")
        .min(1, "At least 1 lesson is required")
        .max(50, "Target cannot exceed 50 lessons")
});
