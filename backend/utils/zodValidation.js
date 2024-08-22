import { z } from "zod";

const signupSchema = z.object({
	username: z.string().trim().toLowerCase(),
	email: z
		.string()
		.email({ message: "Invalid email address" })
		.trim()
		.toLowerCase(),
	password: z.string().min(8, "Password must be at least 8 characters long"),
});

const loginSchema = z.object({
	email: z
		.string()
		.email({ message: "Invalid email address" })
		.trim()
		.toLowerCase(),
	password: z.string().min(8, "Password must be at least 8 characters long"),
});

const todoZodSchema = z.object({
	owner: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
	isCompleted: z.boolean().optional(),
	title: z
		.string()
		.min(1, "Title is required")
		.max(100, "Title must be less than 100 characters"),
	description: z
		.string()
		.min(1, "Description is required")
		.max(500, "Description must be less than 500 characters"),
});

export { signupSchema, loginSchema, todoZodSchema };
