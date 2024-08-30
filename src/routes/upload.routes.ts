import { PostUploadDto } from "../dto/upload.dto";
import express from "express";
import { validator } from "../decorators/validator";
import { UploadController } from "../controllers/upload.controller";

const router = express.Router();

const uploadController = new UploadController();

router.post("/", validator(PostUploadDto), (req, res) =>
  uploadController.upload(req, res)
);

export default router;
