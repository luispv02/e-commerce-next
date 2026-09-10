import Image from "next/image";
import Link from "next/link";

import { getProductCategoryLabel } from "@/features/products/config/categories";
import { formatPrice } from "@/lib/format-price";
import { productsResponse } from "@/mocks/products";

export function FeaturedProducts() {
  return (
    <section className="py-10">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-950">
          Productos destacados
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {productsResponse.data.products.map((product) => {
          const image = product.images[0];

          return (
            <article key={product.id} className="group overflow-hidden rounded-xl border border-slate-200 bg-white flex flex-col justify-between">
              <Link href={`/products/${product.slug}`}>
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={image.url}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-contain p-2 transition duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>

              <div className="p-4">
                <p className="text-xs text-slate-500">
                  {getProductCategoryLabel(product.category)}
                </p>

                <Link href={`/products/${product.id}`}>
                  <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-slate-950">
                    {product.title}
                  </h3>
                </Link>

                <p className="mt-2 text-lg font-bold text-slate-950">
                  {formatPrice(product.price)}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}