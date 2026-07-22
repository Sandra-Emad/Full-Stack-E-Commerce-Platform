import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";


// ==============================
// ADD PRODUCT IMAGE
// ==============================

export const addProductImage = async (
  productId,
  file
) => {

  // ==============================
  // CHECK FILE
  // ==============================

  if (!file) {
    throw new AppError(
      "Image file is required",
      400
    );
  }


  // ==============================
  // CHECK PRODUCT
  // ==============================

  const product =
    await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });


  if (!product) {
    throw new AppError(
      "Product not found",
      404
    );
  }


  // ==============================
  // CREATE IMAGE RECORD
  // ==============================

  const image =
    await prisma.productImage.create({
      data: {
        productId,

        imageUrl:
          `/uploads/products/${file.filename}`,
      },
    });


  return image;
};


// ==============================
// GET PRODUCT IMAGES
// ==============================

export const getProductImages = async (
  productId
) => {

  const product =
    await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });


  if (!product) {
    throw new AppError(
      "Product not found",
      404
    );
  }


  const images =
    await prisma.productImage.findMany({
      where: {
        productId,
      },

      orderBy: {
        createdAt: "asc",
      },
    });


  return images;
};


// ==============================
// DELETE PRODUCT IMAGE
// ==============================

export const deleteProductImage = async (
  productId,
  imageId
) => {

  const image =
    await prisma.productImage.findFirst({
      where: {

        id: imageId,

        productId,
      },
    });


  if (!image) {
    throw new AppError(
      "Product image not found",
      404
    );
  }


  await prisma.productImage.delete({
    where: {
      id: imageId,
    },
  });


  return {
    message:
      "Product image deleted successfully",
  };
};