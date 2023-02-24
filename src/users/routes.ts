const router = require("express").Router();
import { Request, Response } from "express";
// User Service
import userService from "./service";
// Middleware
import { checkAuthMiddleware } from "../middlewares";

router.post("/register", async (req: Request, res: Response) => {
	try {
		const { username, email, password } = req.body;
		await userService.register(username, email, password);
		return res.status(200).json({
			response: "done",
		});
	} catch (error) {
		return res.status(500).json({
			error,
		});
	}
});

router.post("/login", async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const token = await userService.login(username, password);
		return res.status(200).json({
			token,
		});
	} catch (error) {
		return res.status(500).json({
			errorMessage: error,
		});
	}
});

router.get("/secret", checkAuthMiddleware, (req: Request, res: Response) => {
	res.json({ message: "You have access to the secret resource" });
});

router.get("/", async (req: Request, res: Response) => {
	try {
		const users = userService.getAllusers();
		return res.status(200).json({
			users,
		});
	} catch (error) {
		return res.status(500).json({
			error,
		});
	}
});

export default router;
