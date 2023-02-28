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
			return originalMethod
				.call(this, req, res, next)
				.then((data: any) => {
					//work in progress
					console.log(data);
					return data;
				})
				.catch((errorMessage: Error) => {
					console.error(`Error in ${req.method} ${req.path}: ${errorMessage}`);
				});
		};

		return descriptor;
	};
}
