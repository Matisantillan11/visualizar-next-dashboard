import { Role } from "@/lib/react-query/users/users.types";
import * as z from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Por favor ingrese un email válido"),
  dni: z.string().min(8, "El DNI debe tener al menos 8 caracteres"),
  role: z.enum(Role),
});
