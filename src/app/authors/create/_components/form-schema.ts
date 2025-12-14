import { z } from "zod";

export const authorFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  biography: z.string().min(1, "La biografía es requerida"),
});
