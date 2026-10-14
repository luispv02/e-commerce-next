"use client";

import { payOrder } from "@/features/checkout/actions/pay-order";
import { useTransition } from "react";
import { FiCreditCard } from "react-icons/fi";
import { toast } from "sonner";

interface PayOrderButtonProps {
  orderId: string;
}

export const PayOrderButton = ({ orderId }: PayOrderButtonProps) => {

  const [isPending, startTransition] = useTransition();

  const handlePayment = () => {
    startTransition(async () => {
      try {
        const result = await payOrder(orderId);

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        window.location.assign(result.checkoutUrl);
      } catch (error) {
        console.error("Error al pagar la orden:", error);
        toast.error("No se pudo iniciar el pago.");
      }
    });
  };


  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={isPending}
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white sm:w-auto cursor-pointer hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <FiCreditCard className="size-4" />
      {isPending ? "Preparando pago..." : "Pagar orden"}
    </button>
  );
};
