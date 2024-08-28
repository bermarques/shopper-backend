import app from "../index";

const { PORT } = process.env;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
