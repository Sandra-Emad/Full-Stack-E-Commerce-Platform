import express from "express";

import {
  adminTest,
} from "../controllers/admin.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * GET /api/admin/admin-test
 *
 * Protected Admin Route
 */
router.get(
  "/admin-test",
  authMiddleware,
  roleMiddleware("ADMIN"),
  adminTest
);

export default router;