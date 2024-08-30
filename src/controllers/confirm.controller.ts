import { Request, Response } from "express";
import { ConfirmService } from "../services/confirm.service";
import { APIResponse } from "../utils/apiResponse";

export class ConfirmController {
  private confirmService: ConfirmService;

  constructor() {
    this.confirmService = new ConfirmService();
  }

  public async confirm(req: Request, res: Response) {
    try {
      const confirmService: APIResponse =
        await this.confirmService.confirmMeasure(req);
      return res.status(confirmService.status).json(confirmService.data);
    } catch (error: any) {
      return res.status(error.status).json(error);
    }
  }
}
