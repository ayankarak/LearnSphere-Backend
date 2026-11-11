import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Category name must be at least 3 characters")
    .max(100, "Category name cannot exceed 100 characters"),

  slug: z
    .string()
    .trim()
    .min(3, "Slug must be at least 3 characters")
    .max(120, "Slug cannot exceed 120 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers and hyphens"),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional()
    .nullable(),
});

export const updateCategorySchema = createCategorySchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least one field is required"
  );