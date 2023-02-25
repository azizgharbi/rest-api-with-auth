import express from "express";
import bp from "body-parser";
// Routes
import userRoutes from "./src/users/routes";

const app = express();

app.use(bp.json());
app.use("/api/v1/user", userRoutes);

app.listen(5000, () => {
	console.log("Server listening on port 5000");
});
