import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio")
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z
    .string()
    .trim()
    .min(1, "El correo electrónico es obligatorio")
    .email("Ingresa un correo electrónico válido"),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
