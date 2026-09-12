import { formatPrice } from "@/lib/format-price";
import type { Product } from "@/types/product";
import Image from "next/image";
import { ProductActions } from "./ProductActions";
import { ProductStatusToggle } from "./ProductStatusToggle";
import { ProductStockBadge } from "./ProductStockBadge";

interface ProductListCardProps {
  product: Product;
}

export const ProductListCard = ({ product }: ProductListCardProps) => {
  const image = product.images[0];

  return (
    <article className="rounded-xl border border-slate-200 p-4">
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
          <p className="text-sm font-semibold text-slate-950">{product.title}</p>
          <p className="mt-1 text-xs text-slate-500">
            {product.category}
          </p>
        </div>

        <ProductActions slug={product.slug} />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <ProductStockBadge stock={product.stock} />
        <p className="text-sm font-bold text-slate-950">{formatPrice(product.price)}</p>
        <ProductStatusToggle isActive={product.isActive} />
      </div>
    </article>
  );
};
