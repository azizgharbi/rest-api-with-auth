import { Request } from "express";
import userService from "./service";
// helpers
import { ControllerMethodHandler } from "../../helper/handler";

class UserController {
	/*
	 * method: register
	 */

	@ControllerMethodHandler
	async register(req: Request) {
		try {
			const { username, email, role, password } = req.body;
			const user = await userService.register(username, email, role, password);
			return user;
		} catch (error: any) {
			throw error;
		}
	}

	/*
	 * method: login
	 */
	@ControllerMethodHandler
	async login(req: Request) {
		try {
			const { email, password } = req.body;
			const token = await userService.login(email, password);
			return token;
		} catch (error: any) {
			throw error;
		}
	}

	/*
	 * method: secret
	 */
	@ControllerMethodHandler
	async secret() {
		try {
			return "You have access to this ressorces";
		} catch (error: any) {
			throw error;
		}
	}

	/*
	 * method: getAllUsers
	 */
	@ControllerMethodHandler
	async getAllUsers() {
		try {
			const users = await userService.getAllusers();
			return users;
		} catch (error: any) {
			throw error;
		}
	}
}

export default new UserController();
