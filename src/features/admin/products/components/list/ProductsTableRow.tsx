import { formatPrice } from "@/lib/format-price";
import type { Product } from "@/types/product";
import Image from "next/image";
import { ProductActions } from "./ProductActions";
import { ProductStatusToggle } from "./ProductStatusToggle";
import { ProductStockBadge } from "./ProductStockBadge";
import { FiStar } from "react-icons/fi";

interface ProductsTableRowProps {
  product: Product;
}

export const ProductsTableRow = ({ product }: ProductsTableRowProps) => {
  const image = product.images[0];

  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="py-3 pr-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative size-15 shrink-0 overflow-hidden">
            {image && (
              <Image
                src={image.url}
                alt={product.title}
                fill
                sizes="96px"
                className="object-contain p-0.5"
              />
            )}
          </div>

          {product.isFeatured && (
            <FiStar
              className="size-4 shrink-0 fill-current text-amber-400/50"
              aria-label="Producto destacado"
            />
          )}

          <p className="truncate text-sm font-semibold text-slate-950">{product.title}</p>
        </div>
      </td>
      <td className="py-3 pr-4 text-sm text-slate-600 text-center capitalize">
        {product.category}
      </td>
      <td className="py-3 pr-4 text-center">
        <ProductStockBadge stock={product.stock} />
      </td>
      <td className="py-3 pr-4 text-sm font-semibold text-slate-950 text-center">
        {formatPrice(product.price)}
      </td>
      <td className="py-3 pr-4 text-center">
        <ProductStatusToggle productId={product.id} isActive={product.isActive} />
      </td>
      <td className="py-3">
        <ProductActions id={product.id} slug={product.slug} title={product.title} />
      </td>
    </tr>
  );
};
