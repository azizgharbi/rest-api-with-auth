import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import swaggerUi from "swagger-ui-express";
import path from "path";

import { RegisterRoutes } from "../build/routes";
import { errorHandler } from "./middlewares/errors";
import { PORT } from "./config";

dotenv.config();

const openApiDocumentation = require(
  path.join(__dirname, "../build/swagger.json"),
);

const app = express();

app.use(
  urlencoded({
    extended: true,
  }),
);

app.use(json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

RegisterRoutes(app);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
