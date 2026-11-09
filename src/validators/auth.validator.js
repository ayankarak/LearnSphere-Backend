
import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must contain at least 3 characters")
        .max(100),

    email: z
        .string()
        .trim()
        .email("Please provide a valid email")
        .transform((value) => value.toLowerCase()),

    password: z
        .string()
        .min(8, "Password must contain at least 8 characters")
        .max(72, "Password is too long")
});

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Please provide a valid email")
        .transform((value) => value.toLowerCase()),

    password: z
        .string()
        .min(1, "Password is required")
        .max(72, "Password is too long")
});
