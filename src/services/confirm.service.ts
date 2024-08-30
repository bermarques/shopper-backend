import _ from "lodash";
import { apiResponse } from "../utils/apiResponse";
import prisma from "./prisma";
import { Request } from "express";

export class ConfirmService {
  async confirmMeasure(req: Request) {
    try {
      const { measure_uuid, confirmed_value } = req.body;

      const measurement = await prisma.measurement.findUnique({
        where: { measure_uuid: measure_uuid },
      });

      if (!measurement) {
        throw apiResponse({
          status: 404,
          error_code: "MEASURE_NOT_FOUND",
          error_description: "Leitura não encontrada",
        });
      }

      if (measurement.has_confirmed) {
        throw apiResponse({
          status: 409,
          error_code: "CONFIRMATION_DUPLICATE",
          error_description: "Leitura já confirmada",
        });
      }

      await prisma.measurement.update({
        where: { measure_uuid: measure_uuid },
        data: { has_confirmed: true, measure_value: confirmed_value },
      });

      return apiResponse({ status: 200, data: { success: true } });
    } catch (error: any) {
      return apiResponse({
        status: error?.status || 500,
        error_description: error.data.error_description,
        error_code: error.data.error_code || "INTERNAL_SERVER_ERROR",
      });
    }
  }
}
