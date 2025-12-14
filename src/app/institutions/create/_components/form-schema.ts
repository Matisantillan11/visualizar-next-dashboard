import * as z from "zod";

export const insitutionSchema = z.object({
  name: z.string("El nombre es requerido"),
  address: z.string("La dirección es requerida"),
  phone: z.string("El número de teléfono es requerido"),
  email: z.string().email("Por favor ingrese un email válido"),
});
