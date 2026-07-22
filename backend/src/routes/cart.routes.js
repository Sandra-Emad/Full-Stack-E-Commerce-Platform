import express from "express";

import {
  getMyCartController,
  addToCartController,
  updateCartItemController,
  removeFromCartController,
  clearCartController,
} from "../controllers/cart.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";


const router =
  express.Router();


// ==============================
// ALL CART ROUTES REQUIRE LOGIN
// ==============================


// GET MY CART

router.get(
  "/",
  authMiddleware,
  getMyCartController
);


// ADD PRODUCT TO CART

router.post(
  "/items",
  authMiddleware,
  addToCartController
);


// UPDATE CART ITEM

router.patch(
  "/items/:itemId",
  authMiddleware,
  updateCartItemController
);


// REMOVE CART ITEM

router.delete(
  "/items/:itemId",
  authMiddleware,
  removeFromCartController
);


// CLEAR CART

router.delete(
  "/",
  authMiddleware,
  clearCartController
);


export default router;