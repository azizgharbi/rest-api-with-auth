import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const checkAuthMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const token = req.headers.authorization;
	if (token) {
		jwt.verify(token, JWT_SECRET, (err, _decoded) => {
			if (err) {
				res.status(401).json({
					errorMessage: "Invalid token",
					response: "Failed",
				});
			} else {
				next();
			}
		});
	} else {
		res
			.status(401)
			.json({ errMessage: "Authentication required", reponse: "Failed" });
	}
};
