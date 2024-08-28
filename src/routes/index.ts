import { Express } from "express";
import upload from "./upload.routes";
import confirm from "./confirm.routes";
import list from "./list.routes";

const appRoutes = (app: Express) => {
  app.use("/upload", upload);
  app.use("/confirm", confirm);
  app.use("/", list);
};

export default appRoutes;
