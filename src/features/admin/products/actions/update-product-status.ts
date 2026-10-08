"use server";

import { getSession } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";
import { updateProductStatusService } from "../services/product.service";
import type { UpdateProductStatusPayload } from "../types/product-actions";

export const updateProductStatus = async (payload: UpdateProductStatusPayload) => {
  const session = await getSession();

  if (session?.user.role !== "admin") {
    return {
      success: false as const,
      message: "No tienes permisos para editar productos",
    };
  }

  const result = await updateProductStatusService(payload);

  if (result.success) {
    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath("/");
  }

  return result;
};
