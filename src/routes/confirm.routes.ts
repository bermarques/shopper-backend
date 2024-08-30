import express from "express";
import { PatchConfirmDto } from "../dto/confirm.dto";
import { ConfirmController } from "../controllers/confirm.controller";
import { validator } from "../decorators/validator";

const router = express.Router();
const confirmController = new ConfirmController();

router.patch("/", validator(PatchConfirmDto), (req, res) =>
  confirmController.confirm(req, res)
);

export default router;
