import express from "express";

const router = express.Router();

router.get("/:customer_code/list", (req, res) => res.send("test"));

export default router;
