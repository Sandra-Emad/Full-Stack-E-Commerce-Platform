import express from "express";

import protect from "../middlewares/auth.middleware.js";

import authorize from "../middlewares/role.middleware.js";

import adminController from "../controllers/admin.controller.js";

const router = express.Router();

router.get(

"/dashboard",

protect,

authorize("ADMIN"),

adminController.dashboard

);

router.get(

"/products",

protect,

authorize("ADMIN"),

adminController.products

);

export default router;