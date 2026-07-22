import express from "express";

import {
  uploadProductImageController,
  getProductImagesController,
  deleteProductImageController,
} from "../controllers/productImage.controller.js";

import upload from "../middlewares/upload.middleware.js";

import authMiddleware from "../middlewares/auth.middleware.js";

import roleMiddleware from "../middlewares/role.middleware.js";


const router =
  express.Router();


// ==============================
// UPLOAD PRODUCT IMAGE
// ADMIN ONLY
// ==============================

router.post(

  "/:productId",

  authMiddleware,

  roleMiddleware("ADMIN"),

  upload.single("image"),

  uploadProductImageController
);


// ==============================
// GET PRODUCT IMAGES
// PUBLIC
// ==============================

router.get(

  "/:productId",

  getProductImagesController
);


// ==============================
// DELETE PRODUCT IMAGE
// ADMIN ONLY
// ==============================

router.delete(

  "/:productId/:imageId",

  authMiddleware,

  roleMiddleware("ADMIN"),

  deleteProductImageController
);


export default router;