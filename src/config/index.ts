import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

export const prisma = new PrismaClient();
export const JWT_SECRET = process.env.JWT_SECRET ?? "CHANGE_ME";
export const PORT = Number(process.env.PORT ?? 5000);
export const DATABASE_URL = process.env.DATABASE_URL;
