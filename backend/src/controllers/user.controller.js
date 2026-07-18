import {
  getUserProfile,
  updateUserProfile,
} from "../services/user.service.js";



/**
 * Get current logged-in user profile
 */
export const getProfile = async (req, res, next) => {
  try {

    const user = await getUserProfile(
      req.user.id
    );


    res.status(200).json({
      success: true,
      user,
    });


  } catch (error) {
    next(error);
  }
};





/**
 * Update current logged-in user profile
 */
export const updateProfile = async (
  req,
  res,
  next
) => {

  try {

    const user = await updateUserProfile(
      req.user.id,
      req.body
    );


    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user,
    });


  } catch (error) {
    next(error);
  }
};

export const adminTest = (req, res) => {

  res.json({
    success: true,
    message: "Welcome Admin. You have access.",
    user: req.user,
  });

};