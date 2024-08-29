import { OutgoingMessage } from "http";
import { Request, Response } from "express";
import { ListService } from "../services/list.service";
import { APIResponse } from "../utils/apiResponse";

export class ListController extends ListService {
  public async getList(req: Request, res: Response) {
    try {
      const listService: APIResponse = await super.getMeasures(req);
      return res.status(listService.code).json(listService);
    } catch (error: any) {
      return res.status(error.error_code).json(error);
    }
  }
}
