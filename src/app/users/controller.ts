import { Body, Get, Post, Route, Security, Tags } from "tsoa";
import { RegisterRequest, LogionRequest } from "./types";
import userService from "./service";

@Tags("User")
@Route("/api/v1/user")
export class UserController {
  /*
   * User Controller
   */
  @Get()
  async getAllUsers() {
    const users = await userService.getAllusers();
    return users;
  }

  @Post("/register")
  async register(@Body() requestBody: RegisterRequest) {
    const user = await userService.register(requestBody);
    return user;
  }

  @Post("/login")
  async login(@Body() requesBody: LogionRequest) {
    const token = await userService.login(requesBody);
    return token;
  }

  @Security("jwt")
  @Get("/secret")
  async secret() {
    return { message: "You have access to this ressorces" };
  }
}
