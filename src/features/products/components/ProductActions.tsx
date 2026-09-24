"use client";

import { addCartItem } from "@/features/cart/actions/add-cart-item";
import { savePendingCartItem } from "@/features/cart/lib/pending-item";
import { Product, ProductVariant } from "@/types/product";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FiLoader, FiShoppingBag } from "react-icons/fi";
import { toast } from "sonner";

interface ProductActionsProps {
  product: Product;
  variants?: ProductVariant;
}

export const ProductActions = ({ product, variants }: ProductActionsProps) => {

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAddToCart = async () => {

    startTransition(async () => {
      try {

        const payload = {
          productId: product.id,
          quantity: 1,
          ...(product.category === "clothes" && variants ? { variants } : {}),
        };

        const result = await addCartItem(payload);

        if (!result.success) {

          if (result.code === "UNAUTHENTICATED") {
            savePendingCartItem(payload);
            router.push("/cart");
            return;
          }

          toast.error(result.message);
          return;
        }

        toast.success("Producto agregado al carrito");
      } catch (error) {
        console.error("Error al agregar el producto al carrito:", error);
        toast.error("No se pudo agregar el producto al carrito.");
      }
    });
  };

  const isVariantsRequired = product.category === "clothes" && ((product.sizes.length > 0 && !variants?.size) || (product.colors.length > 0 && !variants?.color));
  const isOutOfStock = product.stock <= 0;
  const isDisabled = isVariantsRequired || isOutOfStock;

  return (
    <div className="flex flex-col gap-3 sm:ƒflex-row">
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isDisabled || isPending}
        className="cursor-pointer inline-flex w-full h-14 items-center justify-center gap-3 rounded-xl bg-slate-950 px-6 text-base font-bold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <FiLoader className="size-5 animate-spin" />
            Agregando...
          </>
        ) : (
          <>
            <FiShoppingBag className="size-5" />
            Agregar al carrito
          </>
        )}
      </button>
    </div>
  );
};
