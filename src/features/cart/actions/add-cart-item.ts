"use server";

import { getSession } from "@/lib/auth-utils";
import { addCartItemService } from "../services/cart.service";
import type { AddCartItem } from "../types/cart";
import { revalidatePath } from "next/cache";

export const addCartItem = async (data: AddCartItem) => {
  const session = await getSession();

  if (!session?.user) {
    return {
      success: false,
      code: "UNAUTHENTICATED",
      message: "Debes iniciar sesión para agregar productos al carrito",
    };
  }

  const result = await addCartItemService(
    session.user.id,
    data,
  );

  if (result.success) {
    revalidatePath("/", "layout");
  }

  return result;
};