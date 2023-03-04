import { Request } from "express";
import userService from "./service";
// helpers
import { ControllerMethodHandler } from "../helper/handler";
import { validateBodyRequest } from "../helper/request-validator";

class UserController {
  /*
   * method: register
   */

  @ControllerMethodHandler
  @validateBodyRequest(/*Schema validator */)
  async register(req: Request) {
    try {
      const { username, email, password } = req.body;
      const user = await userService.register(username, email, password);
      return user;
    } catch (error: any) {
      throw error.message;
    }
  }

  /*
   * method: login
   */
  @ControllerMethodHandler
  async login(req: Request) {
    try {
      const { username, password } = req.body;
      const token = await userService.login(username, password);
      return token;
    } catch (error: any) {
      throw error.errorMessage;
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
      throw error.errorMessage;
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
      throw error.errorMessage;
    }
  }
}

export default new UserController();
