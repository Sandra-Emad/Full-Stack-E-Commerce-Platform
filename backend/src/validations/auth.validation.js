import Joi from "joi";


// Register Validation

export const registerSchema = Joi.object({

  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      "string.empty": "Name is required.",
      "string.min": "Name must be at least 3 characters.",
    }),


  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Please enter a valid email.",
      "string.empty": "Email is required.",
    }),


  password: Joi.string()
    .min(8)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters.",
      "string.empty": "Password is required.",
    }),

});




// Login Validation

export const loginSchema = Joi.object({

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Please enter a valid email.",
      "string.empty": "Email is required.",
    }),


  password: Joi.string()
    .required()
    .messages({
      "string.empty": "Password is required.",
    }),

});




// Update Profile Validation

export const updateProfileSchema = Joi.object({

  name: Joi.string()
    .min(3)
    .max(50),


  email: Joi.string()
    .email(),

})
.min(1);