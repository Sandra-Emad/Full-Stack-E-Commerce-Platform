import prisma from "../config/prisma.js";
import hashPassword from "../utils/hashPassword.js";
import comparePassword from "../utils/comparePassword.js";
import generateToken from "../utils/generateToken.js";
import AppError from "../utils/AppError.js";


/**
 * Register new user
 */
export const registerUser = async (userData) => {
  const { name, email, password } = userData;


  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });


  if (existingUser) {
    throw new AppError(
      "Email already exists.",
      409
    );
  }


  // Hash password
  const hashedPassword = await hashPassword(password);


  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "CUSTOMER",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });


  return user;
};



/**
 * Login existing user
 */
export const loginUser = async (email, password) => {


  // Find user by email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });


  if (!user) {
    throw new AppError(
      "Invalid email or password.",
      401
    );
  }



  // Compare passwords
  const isPasswordCorrect =
    await comparePassword(
      password,
      user.password
    );


  if (!isPasswordCorrect) {
    throw new AppError(
      "Invalid email or password.",
      401
    );
  }



  // Generate JWT
  const token = generateToken(user);



  return {
    token,

    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
  };
};