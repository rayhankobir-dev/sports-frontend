import * as z from "zod";

export const authSchema = {
  login: z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
  }),
  register: z.object({
    fullName: z.string().min(3, { message: "Please enter your fullname" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
  }),
};
