import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Secret Key
import { JWT_SECRET, prisma } from "../../config";

interface User {
  id: number;
  email: string;
  name: string;
  password: string;
}

class UserService {
  /*
   * Private can be defined here
   */
  constructor() {
    /*
     * Any initialization can be defined here
     */
  }

  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<User | any> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const new_user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });
      return new_user;
    } catch (error: any) {
      throw error;
    }
  }

  async login(email: string, password: string): Promise<string> {
    try {
      const verifiedUser = await this.findUserByEmail(email);

      if (!verifiedUser) {
        throw new Error("username or password something woring");
      }

      const verifiedPassword = this.verifyPassword(verifiedUser, password);

      if (!verifiedPassword) {
        throw new Error("username or password something woring");
      }

      const token = this.generateToken(verifiedUser);

      return token;
    } catch (error: any) {
      throw error;
    }
  }

  async getAllusers(): Promise<User[]> {
    try {
      const users = (await prisma.user.findMany()) as User[];
      return users;
    } catch (error: any) {
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = (await prisma.user.findUnique({ where: { email } })) as User;
    if (user) return user;
    return undefined;
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  generateToken(user: User): string {
    const payload = { id: user.id, email: user.email };
    // Token expire in 10 minutes
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: "10m",
    });
  }

  async verifyToken(token: string): Promise<User | undefined> {
    try {
      const payload = jwt.verify(token, JWT_SECRET) as {
        id: string;
        email: string;
      };

      return this.findUserByEmail(payload.email);
    } catch (err) {
      return undefined;
    }
  }
}

export default new UserService();
