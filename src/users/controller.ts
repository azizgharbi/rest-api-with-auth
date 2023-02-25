import { Request, Response } from "express";
import userService from "./service";

class UserController {
	/*
	 * User controller
	 */

	async register(req: Request, res: Response) {
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
	}
	async login(req: Request, res: Response) {
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
	}

	secret(req: Request, res: Response) {
		res.json({ message: "You have access to the secret resource" });
	}

	getAllUsers(req: Request, res: Response) {
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
	}
}

export default new UserController();
