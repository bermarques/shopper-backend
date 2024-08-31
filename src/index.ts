import express from "express";
import dotenv from "dotenv";
import appRoutes from "./config/configure-routes";

dotenv.config();

const app = express();
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use(express.static("public"));

const { PORT } = process.env;

app.get("/", (req, res) => {
  res.send("alive");
});

appRoutes(app);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));

export default app;
