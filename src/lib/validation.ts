import { z } from "zod"

export const createUserSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long")
});

export type CreateUserInput = z.infer<typeof createUserSchema>;