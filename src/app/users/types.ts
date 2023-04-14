export enum Role {
	Creator = "Creator",
	Customer = "Customer",
}

export type Token = {
	token: string;
};

export type LogionRequest = {
	email: string;
	password: string;
};

export type RegisterRequest = {
	name: string;
	email: string;
	password: string;
	role: Role;
};
