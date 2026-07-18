import express from "express";

import protect from "../middlewares/auth.middleware.js";

import authorize from "../middlewares/role.middleware.js";

import customerController from "../controllers/customer.controller.js";

const router=express.Router();

router.get(

"/dashboard",

protect,

authorize(

"CUSTOMER",

"ADMIN"

),

customerController.dashboard

);

export default router;