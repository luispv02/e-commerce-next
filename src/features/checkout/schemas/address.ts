import { z } from "zod";

export const shippingAddressSchema = z.object({
  fullName: z
    .string()
    .min(1, "El nombre completo es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres"),

  phone: z
    .string()
    .min(1, "El teléfono es obligatorio")
    .regex(/^\d{10}$/, "Ingresa un número de teléfono válido de 10 dígitos"),

  street: z
    .string()
    .min(1, "La calle y número son obligatorios")
    .max(150, "La dirección no puede superar los 150 caracteres"),

  neighborhood: z
    .string()
    .min(1, "La colonia es obligatoria")
    .max(100, "La colonia no puede superar los 100 caracteres"),

  postalCode: z
    .string()
    .min(1, "El código postal es obligatorio")
    .regex(/^\d{5}$/, "El código postal debe tener 5 dígitos"),

  city: z
    .string()
    .min(1, "La ciudad es obligatoria")
    .max(100, "La ciudad no puede superar los 100 caracteres"),

  state: z
    .string()
    .min(1, "Selecciona un estado"),

  references: z
    .string()
    .max(200, "Las referencias no pueden superar los 200 caracteres")
    .optional(),

  saveAddress: z.boolean(),
});

export type ShippingAddressFormData = z.infer<typeof shippingAddressSchema>;