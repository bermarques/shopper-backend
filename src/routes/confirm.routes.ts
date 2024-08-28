import express from "express";
import { PatchConfirmDto } from "../dto/confirm.dto";
import { validator } from "../decorators/validator";

const router = express.Router();

router.patch("/", validator(PatchConfirmDto), (req, res) => res.send("test"));

export default router;
