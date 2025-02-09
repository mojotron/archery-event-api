import { z } from "zod";

export const emailSchema = z.string().email().trim();
const nameSchema = z.string().trim().min(3).max(25);
const passwordSchema = z
  .string()
  .refine(
    (data) =>
      data.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/),
    {
      message: `password must be be minimum of 8 character and including uppercase letter, lowercase letter, number and special character @$!%*?&`,
      path: ["password"],
    }
  );

export const registerSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().trim(),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: `passwords and confirm password do not match`,
    path: ["confirmPassword"],
  });

export const verificationCodeSchema = z.string().length(36).trim();

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  userAgent: z.string().optional(),
});
