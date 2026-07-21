import express from "express";

import {
  register,
  login,
} from "../controllers/auth.controller.js";

import {
  registerValidation,
  loginValidation,
} from "../validations/auth.validator.js";

import validateMiddleware from "../middlewares/validation.middleware.js";

const router = express.Router();

/**
 * POST /api/auth/register
 */
router.post(
  "/register",
  validateMiddleware(registerValidation),
  register
);

/**
 * POST /api/auth/login
 */
router.post(
  "/login",
  validateMiddleware(loginValidation),
  login
);

export default router;