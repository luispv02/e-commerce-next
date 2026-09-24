"use server";

import { revalidatePath } from "next/cache";
import { removeCartItemService } from "../services/cart.service";
import { getSession } from "@/lib/auth-utils";

export const removeCartItem = async (cartItemId: string) => {
  const session = await getSession();

  if (!session?.user) {
    return {
      success: false,
      code: "UNAUTHENTICATED",
      message: "Debes iniciar sesión para modificar tu carrito.",
    };
  }

  const result = await removeCartItemService(session.user.id, cartItemId);

  if (result.success) {
    revalidatePath("/", "layout");
  }

  return result;
};