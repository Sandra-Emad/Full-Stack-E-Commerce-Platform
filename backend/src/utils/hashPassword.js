// src/utils/hashPassword.js

import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

/**
 * Hash a plain text password before saving it to the database.
 *
 * @param {string} password - Plain text password.
 * @returns {Promise<string>} Hashed password.
 */
const hashPassword = async (password) => {
  if (!password) {
    throw new Error("Password is required.");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  return hashedPassword;
};

export default hashPassword;