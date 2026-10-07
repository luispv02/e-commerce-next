"use server";

import { getSession } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";
import { updateProductService } from "../services/product.service";
import { UpdateProductActionPayload } from "../types/product-actions";


export const updateProduct = async (payload: UpdateProductActionPayload) => {

  const session = await getSession();

  if (session?.user.role !== "admin") {
    return {
      success: false as const,
      message: "No tienes permisos para editar productos",
    };
  }

  const result = await updateProductService(payload);

  if (result.success) {
    revalidatePath("/admin/products");
    revalidatePath("/products");
  }

  return result;

};
