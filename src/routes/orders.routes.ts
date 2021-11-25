import * as OrdersController from "../controllers/orders.controller";
import { isRole } from "../middlewares/auth.middleware";
let isAdmin = isRole(1);
import { orderValidations, validate } from "../helpers/validator"

import { Router } from "express";
const router = Router();

router.get("/", isAdmin, OrdersController._get);
router.get("/:id", isAdmin, orderValidations("get"), validate, OrdersController._getById);
router.put("/:id", isAdmin, orderValidations("update"), validate, OrdersController._update);

export default router;