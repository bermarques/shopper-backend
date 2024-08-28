import { PostUploadDto } from "../dto/upload.dto";
import express from "express";
import { validator } from "../decorators/validator";

const router = express.Router();

router.post("/", validator(PostUploadDto), (req, res) => res.send("test"));

export default router;
