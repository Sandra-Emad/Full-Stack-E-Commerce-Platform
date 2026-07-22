import express from "express";

import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/category.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

import roleMiddleware from "../middlewares/role.middleware.js";

import validationMiddleware from "../middlewares/validation.middleware.js";

import {
  createCategorySchema,
  updateCategorySchema,
} from "../validations/category.validator.js";


const router = express.Router();

// PUBLIC ROUTES

router.get(
  "/",
  getAllCategoriesController
);

router.get(
  "/:id",
  getCategoryByIdController
);

// ADMIN ROUTES

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  validationMiddleware(createCategorySchema),
  createCategoryController
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  validationMiddleware(updateCategorySchema),
  updateCategoryController
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  deleteCategoryController
);


export default router;