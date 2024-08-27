import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export const validator = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);

    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      const messages = errors.map((error) =>
        Object.values(error.constraints || {}).join(", ")
      );
      return res.status(400).json({
        statusCode: 400,
        message: messages.join(", "),
        error: "Bad Request",
      });
    }

    next();
  };
};
