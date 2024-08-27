import { Express } from "express";
import confirm from "./confirm.routes";

const appRoutes = (app: Express) => {
  app.use("/confirm", confirm);
};

export default appRoutes;
