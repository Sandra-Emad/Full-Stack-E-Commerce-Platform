import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";


// ==============================
// GET OR CREATE USER CART
// ==============================

const getOrCreateCart = async (userId) => {
  let cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
      },
    });
  }

  return cart;
};


// ==============================
// GET MY CART
// ==============================

export const getMyCart = async (userId) => {
  const cart = await getOrCreateCart(userId);

  const cartWithItems =
    await prisma.cart.findUnique({
      where: {
        id: cart.id,
      },

      include: {
        items: {
          orderBy: {
            createdAt: "asc",
          },

          include: {
            product: {
              include: {
                category: true,
                images: true,
              },
            },
          },
        },
      },
    });


  // ==============================
  // CALCULATE TOTAL
  // ==============================

  let total = 0;


  const items =
    cartWithItems.items.map((item) => {

      const price =
        Number(item.product.price);

      const subtotal =
        price * item.quantity;

      total += subtotal;


      return {
        id: item.id,

        quantity:
          item.quantity,

        product: item.product,

        subtotal,
      };
    });


  return {
    id: cartWithItems.id,

    userId:
      cartWithItems.userId,

    items,

    total: Number(
      total.toFixed(2)
    ),

    createdAt:
      cartWithItems.createdAt,

    updatedAt:
      cartWithItems.updatedAt,
  };
};


// ==============================
// ADD PRODUCT TO CART
// ==============================

export const addToCart = async (
  userId,
  productId,
  quantity
) => {

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
  // CHECK AVAILABILITY
  // ==============================

  if (!product.isAvailable) {
    throw new AppError(
      "Product is currently unavailable",
      400
    );
  }


  // ==============================
  // CHECK STOCK
  // ==============================

  if (product.stock < quantity) {
    throw new AppError(
      `Only ${product.stock} item(s) available in stock`,
      400
    );
  }


  // ==============================
  // GET OR CREATE CART
  // ==============================

  const cart =
    await getOrCreateCart(userId);


  // ==============================
  // CHECK EXISTING CART ITEM
  // ==============================

  const existingItem =
    await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,

          productId,
        },
      },
    });


  // ==============================
  // CALCULATE NEW QUANTITY
  // ==============================

  const newQuantity =
    existingItem
      ? existingItem.quantity + quantity
      : quantity;


  // ==============================
  // CHECK TOTAL STOCK
  // ==============================

  if (
    newQuantity >
    product.stock
  ) {
    throw new AppError(
      `Only ${product.stock} item(s) available in stock`,
      400
    );
  }


  // ==============================
  // UPDATE EXISTING ITEM
  // ==============================

  if (existingItem) {

    await prisma.cartItem.update({
      where: {
        id: existingItem.id,
      },

      data: {
        quantity:
          newQuantity,
      },
    });

  }

  // ==============================
  // CREATE NEW ITEM
  // ==============================

  else {

    await prisma.cartItem.create({
      data: {
        cartId:
          cart.id,

        productId,

        quantity,
      },
    });
  }


  return getMyCart(userId);
};


// ==============================
// UPDATE CART ITEM QUANTITY
// ==============================

export const updateCartItem = async (
  userId,
  itemId,
  quantity
) => {

  const cart =
    await prisma.cart.findUnique({
      where: {
        userId,
      },
    });


  if (!cart) {
    throw new AppError(
      "Cart not found",
      404
    );
  }


  const cartItem =
    await prisma.cartItem.findFirst({
      where: {
        id: itemId,

        cartId:
          cart.id,
      },

      include: {
        product: true,
      },
    });


  if (!cartItem) {
    throw new AppError(
      "Cart item not found",
      404
    );
  }


  // ==============================
  // CHECK PRODUCT
  // ==============================

  if (
    !cartItem.product.isAvailable
  ) {
    throw new AppError(
      "Product is currently unavailable",
      400
    );
  }


  // ==============================
  // CHECK STOCK
  // ==============================

  if (
    quantity >
    cartItem.product.stock
  ) {
    throw new AppError(
      `Only ${cartItem.product.stock} item(s) available in stock`,
      400
    );
  }


  await prisma.cartItem.update({
    where: {
      id: itemId,
    },

    data: {
      quantity,
    },
  });


  return getMyCart(userId);
};


// ==============================
// REMOVE ITEM FROM CART
// ==============================

export const removeFromCart = async (
  userId,
  itemId
) => {

  const cart =
    await prisma.cart.findUnique({
      where: {
        userId,
      },
    });


  if (!cart) {
    throw new AppError(
      "Cart not found",
      404
    );
  }


  const cartItem =
    await prisma.cartItem.findFirst({
      where: {
        id: itemId,

        cartId:
          cart.id,
      },
    });


  if (!cartItem) {
    throw new AppError(
      "Cart item not found",
      404
    );
  }


  await prisma.cartItem.delete({
    where: {
      id: itemId,
    },
  });


  return getMyCart(userId);
};


// ==============================
// CLEAR CART
// ==============================

export const clearCart = async (
  userId
) => {

  const cart =
    await prisma.cart.findUnique({
      where: {
        userId,
      },
    });


  if (!cart) {
    return {
      message:
        "Cart is already empty",
    };
  }


  await prisma.cartItem.deleteMany({
    where: {
      cartId:
        cart.id,
    },
  });


  return {
    message:
      "Cart cleared successfully",
  };
};