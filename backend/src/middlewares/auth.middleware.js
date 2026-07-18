import jwt from "jsonwebtoken";

import AppError from "../utils/AppError.js";



const authMiddleware = (
  req,
  res,
  next
) => {

  try {


    // Get Authorization Header

    const authHeader = req.headers.authorization;



    if (!authHeader) {
      throw new AppError(
        "Authentication required. Token missing.",
        401
      );
    }



    // Expected format:
    // Bearer TOKEN

    const parts = authHeader.split(" ");


    if (
      parts.length !== 2 ||
      parts[0] !== "Bearer"
    ) {

      throw new AppError(
        "Invalid authorization format.",
        401
      );

    }



    const token = parts[1];



    // Verify JWT Token

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );



    // Attach user data to request

    req.user = decoded;



    next();



  } catch (error) {


    if (error.name === "JsonWebTokenError") {

      return next(
        new AppError(
          "Invalid token.",
          401
        )
      );

    }



    if (error.name === "TokenExpiredError") {

      return next(
        new AppError(
          "Token expired.",
          401
        )
      );

    }



    next(error);

  }

};



export default authMiddleware;