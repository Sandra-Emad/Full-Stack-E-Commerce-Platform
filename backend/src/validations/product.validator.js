import Joi from "joi";


// CREATE PRODUCT VALIDATION

export const createProductSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(200)
    .required()
    .messages({
      "string.empty": "Product name is required",
      "string.min": "Product name must be at least 2 characters",
      "string.max": "Product name cannot exceed 200 characters",
      "any.required": "Product name is required",
    }),

  description: Joi.string()
    .trim()
    .max(5000)
    .allow("", null)
    .optional()
    .messages({
      "string.max": "Product description cannot exceed 5000 characters",
    }),

  price: Joi.number()
    .positive()
    .precision(2)
    .required()
    .messages({
      "number.base": "Product price must be a number",
      "number.positive": "Product price must be greater than 0",
      "any.required": "Product price is required",
    }),

  stock: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      "number.base": "Stock must be a number",
      "number.integer": "Stock must be an integer",
      "number.min": "Stock cannot be negative",
      "any.required": "Stock is required",
    }),

  isAvailable: Joi.boolean()
    .optional(),

  categoryId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "Category ID must be a number",
      "number.integer": "Category ID must be an integer",
      "number.positive": "Category ID must be positive",
      "any.required": "Category ID is required",
    }),
});


// UPDATE PRODUCT VALIDATION

export const updateProductSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(200)
    .optional(),

  description: Joi.string()
    .trim()
    .max(5000)
    .allow("", null)
    .optional(),

  price: Joi.number()
    .positive()
    .precision(2)
    .optional(),

  stock: Joi.number()
    .integer()
    .min(0)
    .optional(),

  isAvailable: Joi.boolean()
    .optional(),

  categoryId: Joi.number()
    .integer()
    .positive()
    .optional(),
}).min(1);