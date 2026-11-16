
import { z } from "zod";

export const generateFlashcardsSchema = z.object({
    lessonId: z.coerce
        .number()
        .int()
        .positive("Invalid lesson ID")
});
