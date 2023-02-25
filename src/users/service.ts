import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Secret Key
import {JWT_SECRET} from "../config"

interface User {
	id: string;
	username: string;
	email: string;
	password: string;
}

class UserService {
	private users: User[] = [];
	constructor() {
		this.init();
	}

	async init() {
		this.users = [
			{
				id: "123",
				email: "demo@watcher.com",
				username: "Bob",
				password: await bcrypt.hash("123", 10),
			},
		];
	}

	async register(
		username: string,
		email: string,
		password: string,
	): Promise<User> {
		const id = new Date().getSeconds().toString();
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = { id, username, email, password: hashedPassword };
		this.users.push(user);
		return user;
	}

	async login(username: string, password: string): Promise<string> {
		const verifiedUser = await this.findByUsername(username);

		if (!verifiedUser) {
			throw "username or password something woring";
		}

		const verifiedPassword = this.verifyPassword(verifiedUser, password);

		if (!verifiedPassword) {
			throw "username or password something woring";
		}

		const token = this.generateToken(verifiedUser);

		return token;
	}

	getAllusers(): User[] {
		return this.users;
	}

	async findByUsername(username: string): Promise<User | undefined> {
		return this.users.find((user) => user.username === username);
	}

	async verifyPassword(user: User, password: string): Promise<boolean> {
		return bcrypt.compare(password, user.password);
	}

	generateToken(user: User): string {
		const payload = { id: user.id, username: user.username };
		// Token expire in 10 minutes
		return jwt.sign(payload, JWT_SECRET, {
			expiresIn: "10m",
		});
	}

	async verifyToken(token: string): Promise<User | undefined> {
		try {
			const payload = jwt.verify(token, JWT_SECRET) as {
				id: string;
				username: string;
			};
			return this.users.find(
				(user) => user.id === payload.id && user.username === payload.username,
			);
		} catch (err) {
			return undefined;
		}
	}
}

export default new UserService();
