import * as ModelsController from "../controllers/models.controller";
import { isRole } from "../middlewares/auth.middleware";
let isAdmin = isRole(1);
import { modelValidations, validate } from "../helpers/validator"

import { Router } from "express";
const router = Router();

router.post("/", isAdmin, modelValidations("create"), validate, ModelsController._create);
router.put("/:id", isAdmin, modelValidations("update"), validate, ModelsController._update);
router.delete("/:id", isAdmin, modelValidations("delete"), validate, ModelsController._delete);

router.get("/:id", isAdmin, modelValidations("get"), validate, ModelsController._get);
router.get("/", isAdmin, ModelsController._list);

export default router;