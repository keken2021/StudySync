import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(5, "Email must be at least 5 characters.")
    .max(35, "Email must be at most 35 characters.")
    .email("Invalid email address."),
  password: z
    .string()
    .min(2, "Password must be at least 2 characters.")
    .max(20, "Password must be at most 20 characters."),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    school: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

console.log("formSchema.ts loaded");


export const SubjectSchema = z.object({
  subject: z.string().min(2, "Subject name must be at least 2 characters"),
  units: z.string().min(1, "Units must be selected"),
  semester: z.string().min(1, "Semester must be selected"),
});