// src/utils/comparePassword.js

import bcrypt from "bcrypt";

/**
 * Compare a plain text password with a hashed password.
 *
 * @param {string} plainPassword - Password entered by the user.
 * @param {string} hashedPassword - Password stored in the database.
 * @returns {Promise<boolean>} True if passwords match, otherwise false.
 */
const comparePassword = async (plainPassword, hashedPassword) => {
  if (!plainPassword || !hashedPassword) {
    throw new Error("Both plain password and hashed password are required.");
  }

  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

  return isMatch;
};

export default comparePassword;