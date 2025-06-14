import { z } from "zod";

export const loginSchema = z.object({
  phoneNumber: z.string().min(10).max(20),
  password: z.string().min(5),
});
