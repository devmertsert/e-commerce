import * as BrandsController from "../controllers/brands.controller";
import { isRole } from "../middlewares/auth.middleware";
let isAdmin = isRole(1);
import { brandValidations, validate } from "../helpers/validator"

import { Router } from "express";
const router = Router();

router.post("/", isAdmin, brandValidations("create"), validate, BrandsController._create);
router.put("/:id", isAdmin, brandValidations("update"), validate, BrandsController._update);
router.delete("/:id", isAdmin, brandValidations("delete"), validate, BrandsController._delete);

router.get("/:id", isAdmin, brandValidations("get"), validate, BrandsController._get);
router.get("/", isAdmin, BrandsController._list);

export default router;