import { Router } from "express";
// User Controller
import userController from "./controller";
// Middleware
import { checkAuthMiddleware } from "../../middlewares";

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/secret", checkAuthMiddleware, userController.secret);
router.get("/", userController.getAllUsers);

export default router;
