import { OutgoingMessage } from "http";
import { Request, Response } from "express";
import { ListService } from "../services/list.service";
import { APIResponse } from "../utils/apiResponse";

export class ListController {
  private listService: ListService;

  constructor() {
    this.listService = new ListService();
  }

  public async getList(req: Request, res: Response) {
    try {
      const listService: APIResponse = await this.listService.getMeasures(req);
      return res.status(listService.status).json(listService.data);
    } catch (error: any) {
      return res.status(error.status).json(error);
    }
  }
}
