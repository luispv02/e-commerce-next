import { formatPrice } from "@/lib/format-price";
import Image from "next/image";
import type { CartItem as CartItemType } from "../types/cart";
import { QuantitySelector } from "./QuantitySelector";
import { CartItemInfo } from "./CartItemInfo";
import { getProductFilterLabel } from "@/lib/product-filter-config";
import { useTransition } from "react";
import { removeCartItem } from "../actions/remove-cart-item";
import { toast } from "sonner";
import { ImSpinner2 } from "react-icons/im";
import { FiTrash2 } from "react-icons/fi";
import { updateCartItemQuantity } from "../actions/update-cart-item-quantity";
import { CartItemImage } from "./CartItemImage";



interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { product, quantity, variants, stockAvailable } = item;
  
  const [isRemoving, startRemoveTransition] = useTransition();
  const [isUpdating, startUpdateTransition] = useTransition();

  const image = product.images[0];
  const color = variants?.color ? getProductFilterLabel(product.category, "colors", variants.color) : null;
  const size = variants?.size ? getProductFilterLabel(product.category, "sizes", variants.size) : null;

  const subtotal = product.price * quantity;
  const inStock = stockAvailable > 0;

  const handleRemove = () => {
    startRemoveTransition(async () => {
      try {
        const result = await removeCartItem(item.id);

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success(result.message);
      } catch (error) {
        console.error(error);
        toast.error("No se pudo eliminar el producto.");
      }
    });
  };

  const handleUpdateQuantity = (quantity: number) => {
    startUpdateTransition(async () => {
      try {
        const result = await updateCartItemQuantity(item.id, quantity);

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success(result.message);
      } catch (error) {
        console.error(error);
        toast.error("No se pudo actualizar la cantidad.");
      }
    });
  };

  return (
    <>
      {/* Mobile */}
      <article className="md:hidden rounded-xl border border-slate-200 bg-white p-4 ">
        <div className="flex gap-3">
          <div className="relative size-22 shrink-0 overflow-hidden rounded-lg sm:size-24 border border-slate-200">
            <CartItemImage image={image} title={product.title} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <CartItemInfo
                title={product.title}
                color={color}
                size={size}
                inStock={inStock}
              />

              <button
                type="button"
                onClick={handleRemove}
                disabled={isRemoving}
                aria-label={`Eliminar ${product.title}`}
                className="inline-flex size-8 shrink-0 items-center justify-center text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRemoving ? (
                  <ImSpinner2 className="size-4 animate-spin" />
                ) : (
                  <FiTrash2 className="size-4" />
                )}
              </button>
            </div>

            <p className="mt-2 text-sm font-bold text-slate-950">
              {formatPrice(product.price)}
            </p>



            <div className="mt-4 flex items-end justify-between gap-3">
              <QuantitySelector
                quantity={item.quantity}
                stockAvailable={item.stockAvailable}
                isPending={isUpdating}
                onQuantityChange={handleUpdateQuantity}
              />

              <div className="text-right">
                <p className="text-xs text-slate-500">Subtotal</p>
                <p className="mt-0.5 text-sm font-bold text-slate-950">
                  {formatPrice(subtotal)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Desktop */}
      <article className="hidden md:grid min-w-175 grid-cols-[minmax(0,1fr)_104px_148px_104px_40px] items-center px-6 py-4">
        <div className="flex min-w-0 items-center gap-4">
          <div className="relative size-20 md:size-24 shrink-0 overflow-hidden rounded-lg border border-slate-200">
            <CartItemImage image={image} title={product.title} />
          </div>

          <CartItemInfo
            title={product.title}
            color={color}
            size={size}
            inStock={inStock}
          />
        </div>

        <p className="text-center text-sm text-slate-950">
          {formatPrice(product.price)}
        </p>

        <div className="flex justify-center">
          <QuantitySelector
            quantity={item.quantity}
            stockAvailable={item.stockAvailable}
            isPending={isUpdating}
            onQuantityChange={handleUpdateQuantity}
          />
        </div>

        <p className="text-right text-sm text-slate-950">
          {formatPrice(subtotal)}
        </p>

        <button
          type="button"
          onClick={handleRemove}
          disabled={isRemoving}
          aria-label={`Eliminar ${product.title}`}
          className="inline-flex size-8 cursor-pointer items-center justify-center justify-self-end rounded-full text-red-500 hover:bg-red-600/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRemoving ? (
            <ImSpinner2 className="size-4 animate-spin" />
          ) : (
            <FiTrash2 className="size-4" />
          )}
        </button>
      </article>
    </>
  );
};
