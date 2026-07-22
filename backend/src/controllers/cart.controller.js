import asyncHandler from "../utils/asyncHandler.js";

import {
  getMyCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../services/cart.service.js";


// ==============================
// GET MY CART
// ==============================

export const getMyCartController =
  asyncHandler(async (req, res) => {

    const cart =
      await getMyCart(
        req.user.id
      );


    res.status(200).json({
      success: true,

      cart,
    });
  });


// ==============================
// ADD PRODUCT TO CART
// ==============================

export const addToCartController =
  asyncHandler(async (req, res) => {

    const {
      productId,
      quantity,
    } = req.body;


    const cart =
      await addToCart(

        req.user.id,

        Number(productId),

        Number(quantity)
      );


    res.status(200).json({
      success: true,

      message:
        "Product added to cart successfully",

      cart,
    });
  });


// ==============================
// UPDATE CART ITEM
// ==============================

export const updateCartItemController =
  asyncHandler(async (req, res) => {

    const {
      quantity,
    } = req.body;


    const cart =
      await updateCartItem(

        req.user.id,

        Number(
          req.params.itemId
        ),

        Number(quantity)
      );


    res.status(200).json({
      success: true,

      message:
        "Cart item updated successfully",

      cart,
    });
  });


// ==============================
// REMOVE CART ITEM
// ==============================

export const removeFromCartController =
  asyncHandler(async (req, res) => {

    const cart =
      await removeFromCart(

        req.user.id,

        Number(
          req.params.itemId
        )
      );


    res.status(200).json({
      success: true,

      message:
        "Product removed from cart successfully",

      cart,
    });
  });


// ==============================
// CLEAR CART
// ==============================

export const clearCartController =
  asyncHandler(async (req, res) => {

    const result =
      await clearCart(
        req.user.id
      );


    res.status(200).json({
      success: true,

      ...result,
    });
  });