
import { z } from "zod";

// ENROLLMENT VALIDATION
export const enrollCourseSchema = z.object({
  courseId: z.coerce
    .number()
    .int("Course ID must be an integer")
    .positive("Course ID must be positive"),
});
