
import Image from "next/image";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
};


export const ProductCard = ({ product, priority = false }: ProductCardProps) => {
  return (
    <article className="group relative flex min-h-80 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:min-h-85">

      <Link href={`/products/${product.id}`} className="block">
        <div className="relative mx-auto mt-5 aspect-4/3 w-full max-w-55 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 220px"
            className="object-contain px-2 transition duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="mt-10 flex flex-1 flex-col px-3 pb-3 pt-2 sm:px-4 sm:pb-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="line-clamp-2 text-xs font-bold leading-4 text-slate-950 sm:text-sm sm:leading-5">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs font-medium text-slate-500 mt-auto pt-2">
          {product.category}
        </p>

        <div className="flex flex-wrap items-baseline gap-2 mt-2">
          <p className="text-base font-bold text-slate-950 sm:text-lg">
            ${(product.price)}
          </p>
        </div>

        <button
          type="button"
          className="mt-2 inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-2 text-[11px] font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 sm:h-10 sm:text-xs cursor-pointer"
        >
          <FiShoppingCart className="size-3.5 shrink-0 sm:size-4" />
          <span className="truncate">Agregar</span>
        </button>
      </div>
    </article>
  );
};
