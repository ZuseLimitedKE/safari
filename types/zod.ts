import z from "zod";

export const signUpSchema = z.object({
  full_name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  account_type: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
