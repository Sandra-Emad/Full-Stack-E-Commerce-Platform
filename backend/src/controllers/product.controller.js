import asyncHandler from "../utils/asyncHandler.js";

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../services/product.service.js";


// ==============================
// CREATE PRODUCT
// ==============================

export const createProductController =
  asyncHandler(async (req, res) => {

    const product =
      await createProduct(
        req.body
      );


    res.status(201).json({
      success: true,

      message:
        "Product created successfully",

      product,
    });
  });


// ==============================
// GET ALL PRODUCTS
// SEARCH
// FILTER
// SORT
// PAGINATION
// ==============================

export const getAllProductsController =
  asyncHandler(async (req, res) => {

    const {
      search,

      categoryId,

      isAvailable,

      sortBy,

      order,

      page,

      limit,
    } = req.query;


    // ==============================
    // PARSE QUERY PARAMETERS
    // ==============================

    const parsedCategoryId =
      categoryId
        ? Number(categoryId)
        : undefined;


    const parsedIsAvailable =
      isAvailable !== undefined
        ? isAvailable === "true"
        : undefined;


    const parsedPage =
      page
        ? Number(page)
        : 1;


    const parsedLimit =
      limit
        ? Number(limit)
        : 10;


    // ==============================
    // VALIDATE PAGINATION
    // ==============================

    if (
      !Number.isInteger(
        parsedPage
      ) ||
      parsedPage < 1
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Page must be a positive integer",
      });
    }


    if (
      !Number.isInteger(
        parsedLimit
      ) ||
      parsedLimit < 1 ||
      parsedLimit > 100
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Limit must be between 1 and 100",
      });
    }


    // ==============================
    // GET PRODUCTS
    // ==============================

    const result =
      await getAllProducts({

        search,

        categoryId:
          parsedCategoryId,

        isAvailable:
          parsedIsAvailable,

        sortBy,

        order,

        page:
          parsedPage,

        limit:
          parsedLimit,
      });


    res.status(200).json({
      success: true,

      ...result,
    });
  });


// ==============================
// GET PRODUCT DETAILS
// ==============================

export const getProductByIdController =
  asyncHandler(async (req, res) => {

    const product =
      await getProductById(
        Number(
          req.params.id
        )
      );


    res.status(200).json({
      success: true,

      product,
    });
  });


// ==============================
// UPDATE PRODUCT
// ==============================

export const updateProductController =
  asyncHandler(async (req, res) => {

    const product =
      await updateProduct(

        Number(
          req.params.id
        ),

        req.body
      );


    res.status(200).json({
      success: true,

      message:
        "Product updated successfully",

      product,
    });
  });


// ==============================
// DELETE PRODUCT
// ==============================

export const deleteProductController =
  asyncHandler(async (req, res) => {

    const result =
      await deleteProduct(
        Number(
          req.params.id
        )
      );


    res.status(200).json({
      success: true,

      ...result,
    });
  });