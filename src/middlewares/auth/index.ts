import { Request } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config";

export function expressAuthentication(
  request: Request,
  securityName: string,
  roles?: string[],
): Promise<boolean | Error> {
  if (securityName !== "jwt") {
    return Promise.reject(new Error("Unsupported security scheme."));
  }

  const authorization = request.headers.authorization;
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : authorization;

  return new Promise((resolve, reject) => {
    if (!token) {
      reject(new Error("No token provided"));
      return;
    }

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        reject(new jwt.JsonWebTokenError(err.message));
        return;
      }

      if (roles && decoded && Array.isArray(decoded.roles)) {
        for (const role of roles) {
          if (!decoded.roles.includes(role)) {
            reject(new Error("JWT does not contain required scope."));
            return;
          }
        }
      }

      resolve(true);
    });
  });
}
