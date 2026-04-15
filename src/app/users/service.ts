import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { JWT_SECRET, prisma } from "../../config";
import { RegisterRequest, LoginRequest, Token } from "./types";
import { HttpError } from "../../utils/http-error";

type User = NonNullable<Awaited<ReturnType<PrismaClient["user"]["findUnique"]>>>;

export interface IUserService {
  register(body: RegisterRequest): Promise<User>;
  login(body: LoginRequest): Promise<Token>;
  getAllUsers(): Promise<User[]>;
  findUserByEmail(email: string): Promise<User | null>;
  verifyPassword(user: User, password: string): Promise<boolean>;
  generateToken(user: User): string;
  verifyToken(token: string): Promise<User | null>;
}

export class UserService implements IUserService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly jwtSecret: string,
    private readonly saltRounds = 10,
  ) {}

  async register(body: RegisterRequest): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      throw new HttpError(409, "Email is already registered.");
    }

    const hashedPassword = await this.hashPassword(body.password);

    return await this.prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });
  }

  async login(body: LoginRequest): Promise<Token> {
    const user = await this.findUserByEmail(body.email);

    if (!user) {
      throw new HttpError(401, "Invalid email or password.");
    }

    const isPasswordValid = await this.verifyPassword(user, body.password);

    if (!isPasswordValid) {
      throw new HttpError(401, "Invalid email or password.");
    }

    return { token: this.generateToken(user) };
  }

  async getAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  generateToken(user: User): string {
    const payload = { id: user.id, email: user.email };
    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: "10m",
    });
  }

  async verifyToken(token: string): Promise<User | null> {
    try {
      const payload = jwt.verify(token, this.jwtSecret) as {
        id: string;
        email: string;
      };

      return await this.findUserByEmail(payload.email);
    } catch {
      return null;
    }
  }
}

export const userService = new UserService(prisma, JWT_SECRET);
