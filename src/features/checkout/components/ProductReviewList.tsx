import Image from "next/image";
import { FiEdit2, FiShoppingCart } from "react-icons/fi";
import type { CartItem } from "@/features/cart/types/cart";
import { formatPrice } from "@/lib/format-price";
import { getProductFilterLabel } from "@/lib/product-filter-config";
import { CartItemInfo } from "@/features/cart/components/CartItemInfo";
import Link from "next/link";

interface ProductReviewListProps {
  items: CartItem[];
  itemCount: number;
}

export const ProductReviewList = ({ items, itemCount }: ProductReviewListProps) => {

  return (
    <section className="rounded-lg border border-[#c5d3e6] bg-white p-5 md:p-4">
      <div className="flex items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
          <FiShoppingCart className="size-7" />
        </div>

        <div className="flex justify-between w-full">
          <h2 className="text-xl font-bold tracking-tight text-slate-950">
            Productos ({itemCount})
          </h2>

          <Link
            href={"/cart"}
            className="flex h-9 w-fit items-center justify-center gap-2 rounded-md border border-blue-300 px-4 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 cursor-pointer"
          >
            <FiEdit2 className="size-4" />
            Editar
          </Link>
        </div>
      </div>

      <div className="mt-4 divide-y divide-[#d9e3f0]">
        {items.map((item) => {
          const { id, product, quantity } = item;
          const subtotal = product.price * quantity;
          const color = item.variants?.color ? getProductFilterLabel(product.category, "colors", item.variants.color) : null;
          const size = item.variants?.size ? getProductFilterLabel(product.category, "sizes", item.variants.size) : null;

          return (
            <article key={id} className="grid gap-4 grid-cols-[auto_1fr] py-3">
              <div className="relative size-18 overflow-hidden rounded-md">
                <Image
                  src={product.images[0]?.url ?? "/window.svg"}
                  alt={product.title}
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </div>

              <div className="grid md:grid-cols-3 items-center space-y-1">
                <div>
                  <CartItemInfo title={product.title} color={color} size={size} inStock={false} />
                </div>

                <p className="text-sm font-semibold text-slate-950 sm:text-right">
                  {formatPrice(product.price)}
                </p>

                <div className="grid grid-cols-[1fr_1fr]">
                  <p className="text-sm text-[#29477b] sm:text-center">
                    Cantidad: {quantity}
                  </p>
                  <p className="text-sm font-semibold text-slate-950 text-right">
                    {formatPrice(subtotal)}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
