import express from "express";

import {
  register,
  login,
} from "../controllers/auth.controller.js";

import validate from "../middlewares/validate.middleware.js";

import {
  registerSchema,
  loginSchema,
} from "../validations/auth.validation.js";


const router = express.Router();



// Register Route
router.post(
  "/register",
  validate(registerSchema),
  register
);



// Login Route
router.post(
  "/login",
  validate(loginSchema),
  login
);



export default router;