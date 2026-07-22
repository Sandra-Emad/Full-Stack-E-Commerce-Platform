import asyncHandler from "../utils/asyncHandler.js";

import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../services/category.service.js";

// CREATE CATEGORY

export const createCategoryController =
  asyncHandler(async (req, res) => {
    const category =
      await createCategory(req.body);

    res.status(201).json({
      success: true,
      message:
        "Category created successfully",
      category,
    });
  });

// GET ALL CATEGORIES

export const getAllCategoriesController =
  asyncHandler(async (req, res) => {
    const categories =
      await getAllCategories();

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  });


// GET CATEGORY BY ID

export const getCategoryByIdController =
  asyncHandler(async (req, res) => {
    const category =
      await getCategoryById(
        Number(req.params.id)
      );

    res.status(200).json({
      success: true,
      category,
    });
  });


// UPDATE CATEGORY

export const updateCategoryController =
  asyncHandler(async (req, res) => {
    const category =
      await updateCategory(
        Number(req.params.id),
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "Category updated successfully",
      category,
    });
  });

// DELETE CATEGORY

export const deleteCategoryController =
  asyncHandler(async (req, res) => {
    const result =
      await deleteCategory(
        Number(req.params.id)
      );

    res.status(200).json({
      success: true,
      ...result,
    });
  });