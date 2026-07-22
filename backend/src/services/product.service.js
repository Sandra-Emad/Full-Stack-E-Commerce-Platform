import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";


// ==============================
// CREATE PRODUCT
// ==============================

export const createProduct = async ({
  name,
  description,
  price,
  stock,
  isAvailable,
  categoryId,
}) => {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    throw new AppError(
      "Category not found",
      404
    );
  }

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      stock,
      isAvailable:
        isAvailable !== undefined
          ? isAvailable
          : true,
      categoryId,
    },
    include: {
      category: true,
      images: true,
    },
  });

  return product;
};


// ==============================
// GET ALL PRODUCTS
// SEARCH
// FILTER
// SORT
// PAGINATION
// ==============================

export const getAllProducts = async ({
  search,
  categoryId,
  isAvailable,
  sortBy = "createdAt",
  order = "desc",
  page = 1,
  limit = 10,
}) => {

  // ==============================
  // BUILD WHERE CONDITION
  // ==============================

  const where = {};


  // Search by product name or description

  if (search) {
    where.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }


  // Filter by category

  if (categoryId) {
    where.categoryId = categoryId;
  }


  // Filter by availability

  if (isAvailable !== undefined) {
    where.isAvailable = isAvailable;
  }


  // ==============================
  // ALLOWED SORT FIELDS
  // ==============================

  const allowedSortFields = [
    "name",
    "price",
    "createdAt",
    "updatedAt",
  ];

  const finalSortBy =
    allowedSortFields.includes(sortBy)
      ? sortBy
      : "createdAt";


  // ==============================
  // ALLOWED SORT ORDER
  // ==============================

  const finalOrder =
    order === "asc"
      ? "asc"
      : "desc";


  // ==============================
  // PAGINATION
  // ==============================

  const skip =
    (page - 1) * limit;


  // ==============================
  // GET PRODUCTS + TOTAL COUNT
  // ==============================

  const [
    products,
    totalProducts,
  ] = await Promise.all([
    prisma.product.findMany({
      where,

      include: {
        category: true,
        images: true,
      },

      orderBy: {
        [finalSortBy]: finalOrder,
      },

      skip,

      take: limit,
    }),

    prisma.product.count({
      where,
    }),
  ]);


  // ==============================
  // CALCULATE PAGINATION
  // ==============================

  const totalPages =
    Math.ceil(
      totalProducts / limit
    );


  return {
    products,

    pagination: {
      currentPage: page,
      limit,
      totalProducts,
      totalPages,

      hasNextPage:
        page < totalPages,

      hasPreviousPage:
        page > 1,
    },
  };
};


// ==============================
// GET PRODUCT BY ID
// PRODUCT DETAILS
// ==============================

export const getProductById = async (
  id
) => {

  const product =
    await prisma.product.findUnique({
      where: {
        id,
      },

      include: {
        category: true,

        images: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });


  if (!product) {
    throw new AppError(
      "Product not found",
      404
    );
  }


  return product;
};


// ==============================
// UPDATE PRODUCT
// ==============================

export const updateProduct = async (
  id,
  data
) => {

  const product =
    await prisma.product.findUnique({
      where: {
        id,
      },
    });


  if (!product) {
    throw new AppError(
      "Product not found",
      404
    );
  }


  // Validate category if changed

  if (data.categoryId) {

    const category =
      await prisma.category.findUnique({
        where: {
          id: data.categoryId,
        },
      });


    if (!category) {
      throw new AppError(
        "Category not found",
        404
      );
    }
  }


  const updatedProduct =
    await prisma.product.update({
      where: {
        id,
      },

      data,

      include: {
        category: true,
        images: true,
      },
    });


  return updatedProduct;
};


// ==============================
// DELETE PRODUCT
// ==============================

export const deleteProduct = async (
  id
) => {

  const product =
    await prisma.product.findUnique({
      where: {
        id,
      },
    });


  if (!product) {
    throw new AppError(
      "Product not found",
      404
    );
  }


  await prisma.product.delete({
    where: {
      id,
    },
  });


  return {
    message:
      "Product deleted successfully",
  };
};