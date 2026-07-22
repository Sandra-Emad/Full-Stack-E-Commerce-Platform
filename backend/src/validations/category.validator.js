import Joi from "joi";


// CREATE CATEGORY VALIDATION

export const createCategorySchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Category name is required",
      "string.min": "Category name must be at least 2 characters",
      "string.max": "Category name cannot exceed 100 characters",
      "any.required": "Category name is required",
    }),

  description: Joi.string()
    .trim()
    .max(500)
    .allow("", null)
    .optional()
    .messages({
      "string.max": "Category description cannot exceed 500 characters",
    }),
});


// UPDATE CATEGORY VALIDATION

export const updateCategorySchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .optional()
    .messages({
      "string.min": "Category name must be at least 2 characters",
      "string.max": "Category name cannot exceed 100 characters",
    }),

  description: Joi.string()
    .trim()
    .max(500)
    .allow("", null)
    .optional()
    .messages({
      "string.max": "Category description cannot exceed 500 characters",
    }),
}).min(1);