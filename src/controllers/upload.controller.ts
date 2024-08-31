import { Request, Response } from "express";
import { APIResponse } from "../utils/apiResponse";
import { UploadService } from "../services/upload.service";

export class UploadController {
  private uploadService: UploadService;

  constructor() {
    this.uploadService = new UploadService();
  }

  public async upload(req: Request, res: Response) {
    try {
      const result = await this.uploadService.uploadImage(req);
      return res.status(result.status).json(result.data);
    } catch (error: any) {
      return res.status(error.status).json(error.data);
    }
  }
}
