import { Request, Response, NextFunction } from "express";

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
			.catch((errorMessage: Error) => {
				console.error(`Error in ${req.method} ${req.path}: ${errorMessage}`);
				return res.status(500).json({
					errorMessage,
					response: "Failed",
				});
			});
	};

	return descriptor;
}
