import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";

import {
  getProfile,
  updateProfile,
  adminTest,
} from "../controllers/user.controller.js";


const router = express.Router();



// Protected User Profile

router.get(
  "/profile",
  authMiddleware,
  getProfile
);



router.put(
  "/profile",
  authMiddleware,
  updateProfile
);



// Admin Only Test Route

router.get(
  "/admin-test",
  authMiddleware,
  authorizeRoles("ADMIN"),
  adminTest
);



export default router;