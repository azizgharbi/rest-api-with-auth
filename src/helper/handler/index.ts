import { Request, Response, NextFunction } from "express";
import { prisma } from "./../../config";

/*
 * Handle controller method to standardize reponse
 */

export function ControllerMethodHandler(
	_target: any,
	_propertyKey: string,
	descriptor: PropertyDescriptor,
) {
	const originalMethod = descriptor.value;
	descriptor.value = function (
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		return originalMethod
			.call(this, req, res, next)
			.then((data: any) => {
				return res.status(200).json({
					data,
					response: "Success",
				});
			})
			.catch((error: Error) => {
				console.error("Error in :", {
					method: req.method,
					path: req.path,
					error: error.message,
				});
				return res.status(500).json({
					error: error.message,
					response: "Failed",
				});
			})
			.finally(() => prisma.$disconnect());
	};

	return descriptor;
}
