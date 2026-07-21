import asyncHandler from "../utils/asyncHandler.js";
import * as userService from "../services/user.service.js";


 // Get current customer's profile
 
export const getCustomerProfile = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});


 // Update current customer's profile

export const updateCustomerProfile = asyncHandler(async (req, res) => {
  const updatedUser = await userService.updateUser(
    req.user.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Profile updated successfully.",
    user: updatedUser,
  });
});