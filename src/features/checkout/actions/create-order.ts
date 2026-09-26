"use server";

import type { ShippingAddressFormData } from "@/features/checkout/schemas/address";
import { createOrderService } from "@/features/orders/service/orders.service";
import { getSession } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

export const createOrder = async (shippingAddress: ShippingAddressFormData) => {

  const session = await getSession();

  if (!session?.user) {
    return {
      success: false,
      message: "Debes iniciar sesión para realizar tu compra.",
    };
  }

  const order = await createOrderService({ userId: session.user.id, shippingAddress });

  if (order) {
    revalidatePath("/", "layout");
  }

  return {
    success: true,
    orderId: order.id,
  };
};