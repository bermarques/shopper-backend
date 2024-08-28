import { Express } from "express";
import upload from "./upload.routes";
import confirm from "./confirm.routes";

const appRoutes = (app: Express) => {
  app.use("/upload", upload);
  app.use("/confirm", confirm);
};

export default appRoutes;
