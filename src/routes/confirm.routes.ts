import { PostConfirmDto } from "../dto/confirm.dto";
import express from "express";
import { validator } from "../middleware/validator";

const router = express.Router();

router.post("/", validator(PostConfirmDto), (req, res) => res.send("test"));

export default router;
