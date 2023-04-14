import express from "express";
import bp from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "./options";

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Routes
import UserRoutes from "./src/app/users/routes";

const app = express();

app.use(bp.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/user", UserRoutes);

app.listen(5000, () => {
	console.log("Server listening on port 5000");
});
