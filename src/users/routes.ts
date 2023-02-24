const router = require("express").Router();
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
// User Service
import userService from "./service";
// Secret Key
const JWT_SECRET = "your_secret_key_here";

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

router.get("/secret", (req: Request, res: Response) => {
	// Middleware to check the token
	const token = req.headers.authorization;
	if (token) {
		jwt.verify(token, JWT_SECRET, (err, decoded) => {
			if (err) {
				res.status(401).json({ message: "Invalid token" });
			} else {
				res.json({ message: "You have access to the secret resource" });
			}
		});
	} else {
		res.status(401).json({
			message: "Invalid token",
		});
	}
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
