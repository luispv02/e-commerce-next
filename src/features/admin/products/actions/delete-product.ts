"use server";

import { getSession } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";
import { deleteProductService } from "../services/product.service";

export const deleteProduct = async (productId: string) => {
  const session = await getSession();

  if (session?.user.role !== "admin") {
    return {
      success: false as const,
      message: "No tienes permisos para eliminar productos",
    };
  }

  const result = await deleteProductService(productId);

  if (result.success) {
    revalidatePath("/admin/products");
    revalidatePath("/products");
  }

  return result;
};
