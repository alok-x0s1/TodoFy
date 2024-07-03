import { z } from "zod";

const signupSchema = z.object({
    username: z.string().trim().toLowerCase(),
    email: z.string().email({ message: "Invalid email address" }).trim().toLowerCase(),
    password: z.string()
})

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).trim().toLowerCase(),
    password: z.string()
})

export {
    signupSchema,
    loginSchema
}