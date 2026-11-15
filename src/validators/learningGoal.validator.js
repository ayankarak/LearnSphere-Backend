
import { z } from "zod";

// CREATE TASK
export const createLearningGoalTaskSchema = z.object({
    goalDate: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid goal date format"),

    taskText: z.string()
        .trim()
        .min(1, "Task cannot be empty")
        .max(500, "Task cannot exceed 500 characters")
});

// UPDATE TASK
export const updateLearningGoalTaskSchema = z.object({
    taskText: z.string()
        .trim()
        .min(1, "Task cannot be empty")
        .max(500, "Task cannot exceed 500 characters")
        .optional(),

    isCompleted: z.boolean().optional()
}).refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "At least one field is required"
    }
);
