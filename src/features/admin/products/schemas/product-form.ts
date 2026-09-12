import type { ProductCategory } from "@/types/product";
import { z } from "zod";

export const productFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "El título es obligatorio")
    .max(120, "El título no puede superar los 120 caracteres"),
  price: z
    .string()
    .trim()
    .min(1, "El precio es obligatorio")
    .refine((value) => Number(value) > 0, "Ingresa un precio válido"),
  stock: z
    .string()
    .trim()
    .min(1, "El stock es obligatorio")
    .refine(
      (value) => Number.isInteger(Number(value)) && Number(value) >= 0,
      "Ingresa un stock válido",
    ),
  description: z
    .string()
    .trim()
    .min(1, "La descripción es obligatoria")
    .max(1000, "La descripción no puede superar los 1000 caracteres"),
  category: z.union([
    z.enum(["clothes", "technology", "others"]),
    z.literal(""),
  ]),
  sizes: z.array(z.string()),
  gender: z.string(),
  colors: z.array(z.string()),
  type: z.string(),
  brand: z.string(),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
})
  .superRefine((data, ctx) => {
    if (!data.category) {
      ctx.addIssue({
        code: "custom",
        message: "Selecciona una categoría",
        path: ["category"],
      });
      return;
    }

    if (data.category === "clothes") {
      if (data.sizes.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Selecciona al menos una talla",
          path: ["sizes"],
        });
      }

      if (!data.gender) {
        ctx.addIssue({
          code: "custom",
          message: "Selecciona un género",
          path: ["gender"],
        });
      }

      if (data.colors.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Selecciona al menos un color",
          path: ["colors"],
        });
      }

      if (!data.type) {
        ctx.addIssue({
          code: "custom",
          message: "Selecciona un tipo",
          path: ["type"],
        });
      }
    }

    if (data.category === "technology") {
      if (!data.type) {
        ctx.addIssue({
          code: "custom",
          message: "Selecciona un tipo de producto",
          path: ["type"],
        });
      }

      if (!data.brand) {
        ctx.addIssue({
          code: "custom",
          message: "Selecciona una marca",
          path: ["brand"],
        });
      }
    }

    if (data.isFeatured && !data.isActive) {
      ctx.addIssue({
        code: "custom",
        message: "El producto debe estar activo para ser destacado",
        path: ["isFeatured"],
      });
    }
  });

export type ProductFormValues = z.infer<typeof productFormSchema>;
export type ProductFormCategory = ProductCategory | "";
