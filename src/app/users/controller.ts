import { Body, Get, Post, Route, Security, Tags } from "tsoa";
import { RegisterRequest, LoginRequest } from "./types";
import { userService } from "./service";

@Tags("User")
@Route("/api/v1/user")
export class UserController {
  @Get()
  async getAllUsers() {
    return await userService.getAllUsers();
  }

  @Post("/register")
  async register(@Body() requestBody: RegisterRequest) {
    return await userService.register(requestBody);
  }

  @Post("/login")
  async login(@Body() requestBody: LoginRequest) {
    return await userService.login(requestBody);
  }

  @Security("jwt")
  @Get("/secret")
  async secret() {
    return { message: "You have access to this resource." };
  }
}
