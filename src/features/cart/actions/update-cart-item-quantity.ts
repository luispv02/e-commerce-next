"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth-utils";
import { updateCartItemQuantityService } from "../services/cart.service";

export const updateCartItemQuantity = async (cartItemId: string, quantity: number) => {
  const session = await getSession();

  if (!session?.user) {
    return {
      success: false,
      code: "UNAUTHENTICATED",
      message: "Debes iniciar sesión para modificar tu carrito.",
    };
  }

  const result = await updateCartItemQuantityService(
    session.user.id,
    cartItemId,
    quantity
  );

  if (result.success) {
    revalidatePath("/", "layout");
  }

  return result;
};