import _ from "lodash";
import { apiResponse } from "../utils/apiResponse";
import prisma from "./prisma";
import { Request } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { endOfMonth, startOfMonth } from "../utils/dates";
import getImageFormatFromBase64 from "../utils/getFormatFromBase64";
import path from "path";
import fs from "fs";

export class UploadService {
  async uploadImage(req: Request) {
    try {
      const { GEMINI_API_KEY, PORT } = process.env;
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt =
        "Observe a imagem fornecida e identifique o valor atual do medidor. Extraia o valor numérico exato exibido no visor do medidor e me retorne somente os números.";

      const format = getImageFormatFromBase64(req.body.image);

      const image = {
        inlineData: {
          data: req.body.image,
          mimeType: `image/${format}`,
        },
      };
      const result = await model.generateContent([prompt, image]);
      const measureValue = Number(result.response.text());
      if (Number.isNaN(measureValue)) {
        return apiResponse({
          status: 400,
          error_code: "INVALID_DATA",
          error_description: "Não há um medidor na imagem fornecida.",
        });
      }

      const imageData = req.body.image.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(imageData, "base64");
      const imagesDir = path.join(__dirname, "../../public", "images");
      const imageName = `image-${Date.now()}.${format}`;
      const imagePath = path.join(imagesDir, imageName);

      if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
      }

      fs.writeFileSync(imagePath, buffer);

      const imageUrl = `http://localhost:${PORT}/images/${path.basename(
        imagePath
      )}`;

      return apiResponse({
        status: 200,
        data: { value: measureValue, image_url: imageUrl },
      });
    } catch (error: any) {
      return apiResponse({
        status: error?.status || 500,
        error_description: error?.data?.error_description || error,
      });
    }
  }

  async saveMeasurement(req: Request) {
    try {
      const { measure_datetime, customer_code, measure_type } = req.body;

      const measureDate = new Date(measure_datetime);
      const existingMeasure = await prisma.measurement.findFirst({
        where: {
          customer_code: customer_code,
          measure_type: measure_type,
          measure_datetime: {
            gte: startOfMonth(measureDate),
            lte: endOfMonth(measureDate),
          },
        },
      });

      if (existingMeasure) {
        throw apiResponse({
          status: 409,
          error_description: "Leitura do mês já realizada",
          error_code: "DOUBLE_REPORT",
        });
      }

      const measureValue = await this.uploadImage(req);

      const result = await prisma.measurement.create({
        data: {
          customer_code,
          measure_datetime,
          measure_type: measure_type.toUpperCase(),
          measure_value: measureValue.data.value,
          image_url: measureValue.data.image_url,
        },
        select: {
          measure_value: true,
          measure_uuid: true,
          image_url: true,
        },
      });

      return apiResponse({ status: 200, data: result });
    } catch (error: any) {
      return apiResponse({
        status: error?.status || 500,
        error_description: error?.data?.error_description || error,
        error_code: error.data.error_code || "INTERNAL_SERVER_ERROR",
      });
    }
  }
}
