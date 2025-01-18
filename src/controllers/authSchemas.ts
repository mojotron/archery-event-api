import { z } from "zod";

const nameSchema = z.string();

export const registerSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
    userAgent: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
// .refine(
//   (data) =>
//     data.password.match(
//       /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/
//     ),
//   {
//     message:
//       "password must be be minimum of 8 character and including uppercase letter, lowercase letter, number and special character @$!%*?&",
//     path: ["password"],
//   }
// )
//
