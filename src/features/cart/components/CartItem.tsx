import { formatPrice } from "@/lib/format-price";
import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";
import type { CartItem as CartItemType } from "../types/cart";
import { QuantitySelector } from "./QuantitySelector";
import { CartItemInfo } from "./CartItemInfo";
import { getProductFilterLabel } from "@/lib/product-filter-config";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { product, quantity, variants, stockAvailable } = item;

  const image = product.images[0];
  const color = variants?.color ? getProductFilterLabel(product.category, "colors", variants.color) : null;
  const size = variants?.size ? getProductFilterLabel(product.category, "sizes", variants.size) : null;

  const lineTotal = product.price * quantity;
  const inStock = stockAvailable > 0;

  return (
    <>
      {/* Mobile */}
      <article className="md:hidden rounded-xl border border-slate-200 bg-white p-4 ">
        <div className="flex gap-3">
          <div className="relative size-22 shrink-0 overflow-hidden rounded-lg sm:size-24 border border-slate-200">
            {image && (
              <Image
                src={image.url}
                alt={product.title}
                fill
                sizes="96px"
                className="object-contain"
              />
            )}
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
                aria-label={`Eliminar ${product.title}`}
                className="inline-flex size-8 shrink-0 items-center justify-center text-red-500 "
              >
                <FiTrash2 className="size-4" />
              </button>
            </div>

            <p className="mt-2 text-sm font-bold text-slate-950">
              {formatPrice(product.price)}
            </p>



            <div className="mt-4 flex items-end justify-between gap-3">
              <QuantitySelector quantity={quantity} />

              <div className="text-right">
                <p className="text-xs text-slate-500">Subtotal</p>
                <p className="mt-0.5 text-sm font-bold text-slate-950">
                  {formatPrice(lineTotal)}
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
            {image && (
              <Image
                src={image.url}
                alt={product.title}
                fill
                sizes="96px"
                className="object-contain"
              />
            )}
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
          <QuantitySelector quantity={quantity} />
        </div>

        <p className="text-right text-sm text-slate-950">
          {formatPrice(lineTotal)}
        </p>

        <button
          type="button"
          aria-label={`Eliminar ${product.title}`}
          className="inline-flex size-8 cursor-pointer items-center justify-center justify-self-end rounded-full text-red-500 hover:bg-red-600/10"
        >
          <FiTrash2 className="size-4" />
        </button>
      </article>
    </>
  );
};
