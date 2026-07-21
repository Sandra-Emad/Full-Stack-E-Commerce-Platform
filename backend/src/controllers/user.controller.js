import asyncHandler from "../utils/asyncHandler.js";
import * as userService from "../services/user.service.js";

/**
 * Get current user's profile
 */
export const getProfile = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

/**
 * Update current user's profile
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(
    req.user.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Profile updated successfully.",
    user,
  });
});