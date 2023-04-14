import { Request, Response, NextFunction } from "express";

export function errorHandler(
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction,
): void {
	if (err instanceof Error) {
		res.status(500).json({ error: err.message });
	} else {
		console.error(err);
		res.status(500).json({ error: "Internal server error" });
	}
}
