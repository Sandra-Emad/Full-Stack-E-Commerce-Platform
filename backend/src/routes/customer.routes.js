import express from "express";

import {
  getCustomerProfile,
  updateCustomerProfile,
} from "../controllers/customer.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * Customer Profile
 * GET /api/customer/profile
 */
router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("CUSTOMER"),
  getCustomerProfile
);

/**
 * Update Customer Profile
 * PUT /api/customer/profile
 */
router.put(
  "/profile",
  authMiddleware,
  roleMiddleware("CUSTOMER"),
  updateCustomerProfile
);

export default router;