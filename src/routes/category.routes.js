import express from "express";

import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from "../controllers/category.controller.js";

const router = express.Router();

// Create a new category
router.post("/", createCategory);

// Get all categories
router.get("/", getAllCategories);

// Get category by ID
router.get("/:id", getCategoryById);

// Update category
router.patch("/:id", updateCategory);

// Delete category
router.delete("/:id", deleteCategory);

export default router;
