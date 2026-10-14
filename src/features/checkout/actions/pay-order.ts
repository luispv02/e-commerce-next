"use server";

import { createOrderCheckoutSessionService } from "@/features/orders/service/orders.service";
import { getSession } from "@/lib/auth-utils";

export const payOrder = async (orderId: string) => {
  const session = await getSession();

  if (!session?.user) {
    return {
      success: false as const,
      message: "Debes iniciar sesión para pagar esta orden.",
    };
  }

  if (!orderId) {
    return {
      success: false as const,
      message: "El identificador de la orden es obligatorio.",
    };
  }

  try {
    const checkoutUrl = await createOrderCheckoutSessionService(orderId, session.user.id);

    return {
      success: true as const,
      checkoutUrl,
    };
  } catch (error) {
    console.error("Error al iniciar el pago:", error);

    return {
      success: false as const,
      message: error instanceof Error
        ? error.message
        : "No se pudo iniciar el pago.",
    };
  }
};