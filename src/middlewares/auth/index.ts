import { Request } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config";

export function expressAuthentication(
	request: Request,
	securityName: string,
	roles?: string[],
): Promise<any> {
	if (securityName === "jwt") {
		const token = request.headers.authorization;
		return new Promise((resolve, reject) => {
			if (!token) {
				reject(new Error("No token provided"));
			} else {
				jwt.verify(token, JWT_SECRET, function (err: any, decoded: any) {
					if (err) {
						reject(new jwt.JsonWebTokenError(err));
					} else {
						// Check if JWT contains all required roles
						if (roles) {
							for (let role of roles) {
								if (!decoded.roles.includes(role)) {
									reject(new Error("JWT does not contain required scope."));
								}
							}
						}
						resolve(decoded);
					}
				});
			}
		});
	} else {
		throw new Error("Something wrong");
	}
}
