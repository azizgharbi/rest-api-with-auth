import swaggerJsdoc from "swagger-jsdoc";

export const swaggerOptions: swaggerJsdoc.Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "My API",
			version: "1.0.0",
			description: "A sample API documentation",
		},
		servers: [
			{
				url: "http://localhost:5000",
			},
		],
	},
	apis: ["./src/app/users/routes.ts"], // Update this to the path where your route files are located
};
