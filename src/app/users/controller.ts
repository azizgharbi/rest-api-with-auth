import { Body, Get, Post, Route, Security, Tags } from "tsoa";
import { RegisterRequest, LogionRequest } from "./types";
import userService from "./service";

@Tags("User")
@Route("/api/v1/user")
export class UserController {
	/*
	 * User COntroller
	 */
	@Post("/register")
	async register(@Body() requestBody: RegisterRequest) {
		try {
			const user = await userService.register(requestBody);
			return user;
		} catch (error: any) {
			throw new Error(error);
		}
	}

	@Post("/login")
	async login(@Body() requesBody: LogionRequest) {
		try {
			const token = await userService.login(requesBody);
			return token;
		} catch (error: any) {
			throw new Error(error);
		}
	}

	@Security("jwt")
  @Get("/secret")
	async secret() {
		try {
			return { message: "You have access to this ressorces" };
		} catch (error: any) {
			throw new Error(error);
		}
	}

	@Get()
	async getAllUsers() {
		try {
			const users = await userService.getAllusers();
			return users;
		} catch (error: any) {
			throw new Error(error);
		}
	}
}
