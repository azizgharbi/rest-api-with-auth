import { Response, Request, NextFunction } from "express";
import { ValidateError } from "tsoa";
import { JsonWebTokenError } from "jsonwebtoken";

export function errorHandler(
	error: unknown,
	req: Request,
	res: Response,
	next: NextFunction,
): Response | void {
	if (error instanceof JsonWebTokenError) {
		return res.status(401).json({
			error: error.message,
		});
	}

	if (error instanceof ValidateError) {
		return res.status(422).json({
			message: "Validation Failed",
			details: error?.fields,
		});
	}

	if (error instanceof Error) {
		return res.status(500).json({
			message: error.message,
		});
	}

	next();
}
