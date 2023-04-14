import express, { json, urlencoded } from "express";
import swaggerUi from "swagger-ui-express";
import path from "path";

import { RegisterRoutes } from "./build/routes";
import { errorHandler } from "./src/middlewares/errors";

const openApiDocumentation = require(path.join(
	__dirname,
	"../dist/openapi/swagger.json",
));

const app = express();
// Use body parser to read sent json payloads
app.use(
	urlencoded({
		extended: true,
	}),
);
app.use(json());
RegisterRoutes(app);

app.use(errorHandler);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

app.listen(5000, () => {
	console.log("Server listening on port 5000");
});
