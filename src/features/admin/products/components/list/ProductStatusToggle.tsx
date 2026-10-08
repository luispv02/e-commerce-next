"use client";

import clsx from "clsx";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateProductStatus } from "../../actions/update-product-status";

interface ProductStatusToggleProps {
  productId: string;
  isActive: boolean;
}

export const ProductStatusToggle = ({ productId, isActive }: ProductStatusToggleProps) => {
  const [enabled, setEnabled] = useState(isActive);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = () => {
    const nextStatus = !enabled;

    startTransition(async () => {
      try {
        const result = await updateProductStatus({ productId, isActive: nextStatus });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        setEnabled(nextStatus);
        toast.success(result.message);
      } catch {
        toast.error("No se pudo actualizar el estado del producto");
      }
    });
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={enabled ? "Producto activo" : "Producto inactivo"}
      disabled={isPending}
      onClick={handleStatusChange}
      className={clsx("relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60", enabled ? "bg-emerald-500" : "bg-slate-300")}
    >
      <span className={clsx("inline-block size-4 transform rounded-full bg-white shadow transition-transform duration-200", enabled ? "translate-x-6" : "translate-x-1")}
      />
    </button>
  );
};
