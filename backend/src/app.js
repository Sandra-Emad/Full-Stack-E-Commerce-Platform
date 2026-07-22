import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";

import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import productImageRoutes from "./routes/productImage.routes.js";

import errorMiddleware from "./middlewares/error.middleware.js";


const app = express();


// Global Middlewares

app.use(
  cors({
    origin: "*",
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);


app.use(express.json());

app.use(express.urlencoded({ extended: true }));



// Health Check Route

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-Commerce API is running 🚀",
  });
});


// Serve uploaded files

app.use(
  "/uploads",
  express.static("uploads")
);

// API Routes

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use("/api/categories", categoryRoutes);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/products/images",
  productImageRoutes
);

app.use(
  "/api/cart",
  cartRoutes
);


// Error Handling Middleware

app.use(
  errorMiddleware
);



export default app;