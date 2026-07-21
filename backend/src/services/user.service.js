import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";
import hashPassword from "../utils/hashPassword.js";

/**
 * Get user by ID
 */
export const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
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
 * Update current user's profile
 */
export const updateUser = async (id, data) => {
  const updateData = {};

  if (data.name !== undefined) {
    updateData.name = data.name;
  }

  if (data.email !== undefined) {
    updateData.email = data.email;
  }

  if (data.password !== undefined) {
    updateData.password = await hashPassword(
      data.password
    );
  }

  try {
    return await prisma.user.update({
      where: {
        id: Number(id),
      },

      data: updateData,

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    if (error.code === "P2002") {
      throw new AppError(
        "Email is already in use.",
        409
      );
    }

    throw error;
  }
};