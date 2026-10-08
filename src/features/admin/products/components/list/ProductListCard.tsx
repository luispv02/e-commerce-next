import { formatPrice } from "@/lib/format-price";
import type { Product } from "@/types/product";
import Image from "next/image";
import { ProductActions } from "./ProductActions";
import { ProductStatusToggle } from "./ProductStatusToggle";
import { ProductStockBadge } from "./ProductStockBadge";
import { FiStar } from "react-icons/fi";

interface ProductListCardProps {
  product: Product;
}

export const ProductListCard = ({ product }: ProductListCardProps) => {
  const image = product.images[0];

  return (
    <article className="rounded-xl border border-slate-200 p-3">
      <div className="flex items-start gap-3">
        <div className="relative size-15 shrink-0 overflow-hidden">
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
          <div className="flex min-w-0 items-start gap-2">
            {product.isFeatured && (
              <FiStar
                className="size-4 shrink-0 fill-current text-amber-400/50 mt-1"
                aria-label="Producto destacado"
              />
            )}

            <p className="line-clamp-2 text-sm font-semibold text-slate-950">
              {product.title}
            </p>
          </div>
        </div>

        <ProductActions id={product.id} slug={product.slug} title={product.title} />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <ProductStockBadge stock={product.stock} />
        <p className="text-sm font-bold text-slate-950">{formatPrice(product.price)}</p>
        <ProductStatusToggle productId={product.id} isActive={product.isActive} />
      </div>
    </article>
  );
};
