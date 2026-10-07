"use server";

import { getSession } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";
import { createProductService } from "../services/product.service";
import { CreateProductActionPayload } from "../types/product-actions";


export const createProduct = async (payload: CreateProductActionPayload) => {

  const session = await getSession();

  if (session?.user.role !== "admin") {
    return {
      success: false as const,
      message: "No tienes permisos para crear productos",
    };
  }

  const result = await createProductService(payload);

  if (result.success) {
    revalidatePath("/admin/products");
    revalidatePath("/products");
  }

  return result;

};
