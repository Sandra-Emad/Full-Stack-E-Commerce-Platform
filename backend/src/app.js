import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";

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



// API Routes

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/admin", adminRoutes);

// Error Handling Middleware

app.use(errorMiddleware);



export default app;