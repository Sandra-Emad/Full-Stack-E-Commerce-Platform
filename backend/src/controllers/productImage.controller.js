import asyncHandler from "../utils/asyncHandler.js";

import {
  addProductImage,
  getProductImages,
  deleteProductImage,
} from "../services/productImage.service.js";


// ==============================
// UPLOAD PRODUCT IMAGE
// ==============================

export const uploadProductImageController =
  asyncHandler(
    async (
      req,
      res
    ) => {

      const image =
        await addProductImage(

          Number(
            req.params.productId
          ),

          req.file
        );


      res.status(201).json({

        success: true,

        message:
          "Product image uploaded successfully",

        image,
      });
    }
  );


// ==============================
// GET PRODUCT IMAGES
// ==============================

export const getProductImagesController =
  asyncHandler(
    async (
      req,
      res
    ) => {

      const images =
        await getProductImages(

          Number(
            req.params.productId
          )
        );


      res.status(200).json({

        success: true,

        images,
      });
    }
  );


// ==============================
// DELETE PRODUCT IMAGE
// ==============================

export const deleteProductImageController =
  asyncHandler(
    async (
      req,
      res
    ) => {

      const result =
        await deleteProductImage(

          Number(
            req.params.productId
          ),

          Number(
            req.params.imageId
          )
        );


      res.status(200).json({

        success: true,

        ...result,
      });
    }
  );