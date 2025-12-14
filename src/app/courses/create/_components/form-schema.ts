import z from "zod";

export const courseSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  institutionId: z.string().min(1, "Seleccione una institución"),
});
