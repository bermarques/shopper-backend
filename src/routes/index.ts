import { Express } from "express";
import upload from "./upload.routes";

const appRoutes = (app: Express) => {
  app.use("/upload", upload);
};

export default appRoutes;
