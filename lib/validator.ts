import { z } from "zod"

export const userRegisterSchema = z.object({
    firstName: z.string().min(3, 'Name must be at least 3 letters'),
    lastName: z.string().min(3, 'Name must be at least 3 letters'),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, 'Password must be at least 8 letters'),
    verifiedEmail: z.boolean().optional(),
    avatar: z.string().optional(),
})

export const userLoginSchema = z.object({
    email: z.string().email({
        message: "Invalid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})

export const addTaskSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 4 characters.",
    }),
    description: z.string().min(5, {
        message: "Description must be at least 5 characters.",
    }),
    deadline: z.date({
        required_error: "A date of deadline is required.",
    }),
    important: z.boolean().default(false),
    completed: z.boolean().default(false),
})

export const OtpSchema = z.object({
    otp: z.string().min(6, {
      message: "OTP must be 6 characters.",
    }),
  })