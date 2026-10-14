"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { ShippingAddressFormData } from "@/features/checkout/schemas/address";

import { createOrder } from "../actions/create-order";

interface PaymentSectionProps {
  shippingAddress: ShippingAddressFormData;
}

export const PaymentSection = ({ shippingAddress }: PaymentSectionProps) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handlePayment = () => {
    startTransition(async () => {
      try {
        const result = await createOrder(shippingAddress);
        console.log('RESULTT', result);

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        if (!result.checkoutUrl) {
          toast.error("No se pudo obtener la URL de pago.");
          return;
        }

        window.location.assign(result.checkoutUrl);
      } catch (error) {
        console.error("Error al crear la orden:", error);
        toast.error("No se pudo realizar el pedido.");
      }
    });
  };

  return (
    <div className="mt-5 space-y-4">
      <button
        type="button"
        onClick={handlePayment}
        disabled={isPending}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-5 text-sm font-bold text-white shadow-sm transition cursor-pointer hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Procesando..." : "Realizar pedido"}
      </button>
    </div>
  );
};