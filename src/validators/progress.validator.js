
import { z } from "zod";

export const completeLessonSchema = z.object({
    lessonId: z.coerce
        .number()
        .int("Lesson ID must be an integer")
        .positive("Lesson ID must be positive")
});
