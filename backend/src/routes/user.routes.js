import express from "express";

import {
  getProfile,
  updateProfile,
} from "../controllers/user.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * GET /api/users/profile
 */
router.get(
  "/profile",
  authMiddleware,
  getProfile
);

/**
 * PUT /api/users/profile
 */
router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

export default router;