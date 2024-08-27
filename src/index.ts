import express from "express";
import dotenv from "dotenv";
import appRoutes from "./routes";

dotenv.config();

const app = express();
app.use(express.json());

const { PORT } = process.env;

app.get("/", (req, res) => {
  res.send("alive");
});

appRoutes(app);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));

export default app;
