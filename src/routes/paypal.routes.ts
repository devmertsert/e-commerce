import * as PaypalController from "../controllers/paypal.controller";
import { isRole } from "../middlewares/auth.middleware";
let isAdmin = isRole(1);
import { paypalValidations, validate } from "../helpers/validator"

import { Router } from "express";
const router = Router();

router.post("/", isAdmin, paypalValidations("create"), validate, PaypalController._create);
router.put("/", isAdmin, paypalValidations("update"), validate, PaypalController._update);

router.get("/", isAdmin, PaypalController._get);

export default router;