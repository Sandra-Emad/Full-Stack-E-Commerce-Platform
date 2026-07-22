import express from "express";

import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} from "../controllers/product.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

import roleMiddleware from "../middlewares/role.middleware.js";

import validationMiddleware from "../middlewares/validation.middleware.js";

import {
  createProductSchema,
  updateProductSchema,
} from "../validations/product.validator.js";


const router = express.Router();

// PUBLIC ROUTES

router.get(
  "/",
  getAllProductsController
);

router.get(
  "/:id",
  getProductByIdController
);

// ADMIN ROUTES

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  validationMiddleware(createProductSchema),
  createProductController
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  validationMiddleware(updateProductSchema),
  updateProductController
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  deleteProductController
);


export default router;