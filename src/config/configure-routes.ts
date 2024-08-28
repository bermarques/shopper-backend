import { Express } from "express";
import upload from "../routes/upload.routes";
import confirm from "../routes/confirm.routes";
import list from "../routes/list.routes";

const appRoutes = (app: Express) => {
  app.use("/upload", upload);
  app.use("/confirm", confirm);
  app.use("/", list);
};

export default appRoutes;
