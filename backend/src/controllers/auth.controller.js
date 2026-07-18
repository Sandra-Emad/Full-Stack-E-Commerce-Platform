import {
  registerUser,
  loginUser,
} from "../services/auth.service.js";



/**
 * Register new user
 */
export const register = async (req, res, next) => {
  try {

    const user = await registerUser(req.body);


    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user,
    });


  } catch (error) {
    next(error);
  }
};





/**
 * Login user
 */
export const login = async (req, res, next) => {
  try {

    const { email, password } = req.body;


    const result = await loginUser(
      email,
      password
    );


    res.status(200).json({
      success: true,
      message: "Login successful.",
      ...result,
    });


  } catch (error) {
    next(error);
  }
};