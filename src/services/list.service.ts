import _ from "lodash";
import { apiResponse } from "../utils/apiResponse";
import prisma from "./prisma";
import { Request } from "express";

export class ListService {
  async getMeasures(req: Request) {
    try {
      const { customer_code } = req.params;
      const { measure_type } = req.query;

      const measures = await prisma.measurement.findMany({
        where: { customer_code: customer_code },
        select: {
          measure_uuid: true,
          measure_datetime: true,
          measure_type: true,
          has_confirmed: true,
          image_url: true,
        },
      });

      if (
        measure_type &&
        String(measure_type).toUpperCase() !== ("WATER" || "GAS")
      ) {
        throw apiResponse({
          status: 400,
          error_description: "Tipo de medição não permitida",
          error_code: "INVALID_TYPE",
        });
      }
      if (_.isEmpty(measures))
        throw apiResponse({
          status: 404,
          error_description: "Nenhuma leitura encontrada",
          error_code: "MEASURES_NOT_FOUND",
        });
      return apiResponse({
        status: 200,
        data: { customer_code: customer_code, measures: measures },
      });
    } catch (error: any) {
      return apiResponse({
        status: error?.status || 500,
        error_description: error.data.error_description,
        error_code: error.data.error_code || "INTERNAL_SERVER_ERROR",
      });
    }
  }
}
