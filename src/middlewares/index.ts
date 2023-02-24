import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = "your_secret_key_here";

export const checkAuthMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const token = req.headers.authorization;
	if (token) {
		jwt.verify(token, JWT_SECRET, (err, decoded) => {
			if (err) {
				res.status(401).json({ message: "Invalid token" });
			} else {
				next();
			}
		});
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
};
