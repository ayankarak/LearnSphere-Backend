import { Category, Course } from "../models/associations.js";

import { createCategorySchema, updateCategorySchema } from "../validators/category.validator.js";

// Create Category
export const createCategory = async (req, res, next) => {
  try {
    const validatedData = createCategorySchema.parse(req.body);

    const existingCategory = await Category.findOne({
      where: {
        slug: validatedData.slug,
      },
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category with this slug already exists",
      });
    }

    const category = await Category.create(validatedData);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Categories
export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Course,
          as: "courses",
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

// Get Category By ID
export const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id, {
      include: [
        {
          model: Course,
          as: "courses",
        },
      ],
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};

// Update Category
export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const validatedData = updateCategorySchema.parse(req.body);

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (validatedData.slug) {
      const existingCategory = await Category.findOne({
        where: {
          slug: validatedData.slug,
        },
      });

      if (existingCategory && existingCategory.id !== category.id) {
        return res.status(409).json({
          success: false,
          message: "Category with this slug already exists",
        });
      }
    }

    await category.update(validatedData);

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Category
export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await category.destroy();

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};