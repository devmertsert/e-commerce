import * as ProductsController from "../controllers/products.controller";
import { productValidations, validate } from "../helpers/validator";
import { isRole } from "../middlewares/auth.middleware";

let isAdmin = isRole(1);

import { Router } from "express";
const router = Router();

router.post("/", isAdmin, productValidations("create"), validate, ProductsController._create);
router.put("/:id", isAdmin, productValidations("update"), validate, ProductsController._update);
router.delete("/:id", isAdmin, productValidations("delete"), validate, ProductsController._delete);

router.get("/:id", isAdmin, productValidations("get"), validate, ProductsController._get);
router.get("/", isAdmin, ProductsController._list);

export default router;