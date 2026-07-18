import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";


/**
 * Get user profile by ID
 */
export const getUserProfile = async (userId) => {

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });


  if (!user) {
    throw new AppError(
      "User not found.",
      404
    );
  }


  return user;
};



/**
 * Update user profile
 */
export const updateUserProfile = async (
  userId,
  updateData
) => {

  const { name, email } = updateData;


  // Check if email is already used by another user
  if (email) {

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });


    if (
      existingUser &&
      existingUser.id !== userId
    ) {
      throw new AppError(
        "Email already exists.",
        409
      );
    }
  }



  const updatedUser =
    await prisma.user.update({

      where: {
        id: userId,
      },


      data: {
        ...(name && { name }),
        ...(email && { email }),
      },


      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });



  return updatedUser;
};