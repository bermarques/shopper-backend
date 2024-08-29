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
      });

      if (
        measure_type &&
        String(measure_type).toUpperCase() !== ("WATER" || "GAS")
      ) {
        throw apiResponse({
          code: 400,
          error_description: "Tipo de medição não permitida",
        });
      }
      if (_.isEmpty(measures))
        throw apiResponse({
          code: 404,
          error_description: "Nenhuma leitura encontrada",
        });
      return Promise.resolve(apiResponse({ code: 200, data: measures }));
    } catch (error: any) {
      return Promise.reject(
        apiResponse({
          code: error?.error_code || 500,
          error_description: error.error_description,
        })
      );
    }
  }
}
