import express, { json, urlencoded } from "express";
import swaggerUi from "swagger-ui-express";
import path from "path";

import { RegisterRoutes } from "../build/routes";
import { errorHandler } from "./middlewares/errors";

const openApiDocumentation = require(path.join(
	__dirname,
	"../build/swagger.json",
));

const app = express();

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
