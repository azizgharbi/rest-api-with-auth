import { Request, Response, NextFunction } from "express";

/*
 * Validate request body request query params
 */

export function validateRequest() {
	return function (
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
			// Validate here on the request body depends on http methode
			console.log(req.body)
			return originalMethod
				.call(this, req, res, next)
				.then((data: any) => {
					return data;
				})
				.catch((errorMessage: Error) => {
					console.error(`Error in ${req.method} ${req.path}: ${errorMessage}`);
				});
		};

		return descriptor;
	};
}
