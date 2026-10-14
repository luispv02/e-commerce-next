"use server";

import type { ShippingAddressFormData } from "@/features/checkout/schemas/address";
import { createOrderCheckoutSessionService, createOrderService } from "@/features/orders/service/orders.service";
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

  try {
    const order = await createOrderService({ userId: session.user.id, shippingAddress });

    const checkoutUrl = await createOrderCheckoutSessionService(order.id, session.user.id);

    revalidatePath("/", "layout");

    return {
      success: true,
      orderId: order.id,
      checkoutUrl
    };

  } catch (error) {
    console.error("Error al crear la orden:", error);

    return {
      success: false as const,
      message: error instanceof Error ? error.message : "No se pudo crear la orden ni iniciar el pago.",
    };
  };
};