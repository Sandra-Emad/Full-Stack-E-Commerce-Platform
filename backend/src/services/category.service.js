import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";

// CREATE CATEGORY

export const createCategory = async ({
  name,
  description,
}) => {
  const existingCategory = await prisma.category.findUnique({
    where: {
      name,
    },
  });

  if (existingCategory) {
    throw new AppError(
      "A category with this name already exists",
      409
    );
  }

  const category = await prisma.category.create({
    data: {
      name,
      description,
    },
  });

  return category;
};

// GET ALL CATEGORIES

export const getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  return categories;
};

// GET CATEGORY BY ID

export const getCategoryById = async (id) => {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      products: true,
    },
  });

  if (!category) {
    throw new AppError(
      "Category not found",
      404
    );
  }

  return category;
};

// UPDATE CATEGORY

export const updateCategory = async (
  id,
  data
) => {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!category) {
    throw new AppError(
      "Category not found",
      404
    );
  }

  if (
    data.name &&
    data.name !== category.name
  ) {
    const existingCategory =
      await prisma.category.findUnique({
        where: {
          name: data.name,
        },
      });

    if (existingCategory) {
      throw new AppError(
        "A category with this name already exists",
        409
      );
    }
  }

  const updatedCategory =
    await prisma.category.update({
      where: {
        id,
      },
      data,
    });

  return updatedCategory;
};

// DELETE CATEGORY

export const deleteCategory = async (id) => {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  if (!category) {
    throw new AppError(
      "Category not found",
      404
    );
  }

  if (category._count.products > 0) {
    throw new AppError(
      "Cannot delete a category that contains products",
      409
    );
  }

  await prisma.category.delete({
    where: {
      id,
    },
  });

  return {
    message: "Category deleted successfully",
  };
};