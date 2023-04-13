import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
export const JWT_SECRET = "SECRET_KEY";
