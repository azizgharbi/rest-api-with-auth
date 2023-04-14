import { Request } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config";

export function expressAuthentication(
	request: Request,
	securityName: string,
	roles?: string[],
) {
	if (securityName === "jwt") {
		const token = request.headers.authorization;
		return new Promise((resolve, reject) => {
			if (!token) {
				reject(new Error("No token provided"));
			} else {
				jwt.verify(token, JWT_SECRET, function (err: any, decoded: any) {
					if (err) {
						reject(err);
					} else {
						// Check if JWT contains all required scopes
						//   for (let role of roles) {
						//     if (!decoded.roles.includes(role)) {
						//       reject(new Error("JWT does not contain required scope."));
						//     }
						//   }
						resolve(decoded);
					}
				});
			}
		});
	}
}
