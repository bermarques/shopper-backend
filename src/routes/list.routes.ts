import { ListController } from "../controllers/list.controller";
import express from "express";

const router = express.Router();

const listController = new ListController();

router.get("/:customer_code/list", (req, res) =>
  listController.getList(req, res)
);

export default router;
