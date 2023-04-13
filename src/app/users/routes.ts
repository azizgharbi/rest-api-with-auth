import { Router } from "express";
// User Controller
import UserController from "./controller";
// Middleware
import { checkAuthMiddleware } from "../../middlewares/auth";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/secret", checkAuthMiddleware, UserController.secret);

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user ID
 *                   name:
 *                     type: string
 *                     description: The user's name
 *                   role:
 *                     type: string
 *                     description: The user's role
 *                   email:
 *                     type: string
 *                     description: The user's email
 *                   password:
 *                     type: string
 *                     description: The user's password
 */
router.get("/", UserController.getAllUsers);

export default router;
