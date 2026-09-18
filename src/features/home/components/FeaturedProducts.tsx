import Image from "next/image";
import Link from "next/link";

import { getProductCategoryLabel } from "@/features/products/config/categories";
import { formatPrice } from "@/lib/format-price";
import { getProducts } from "@/features/products/services/product.service";

export const FeaturedProducts = async () => {

  const response = await getProducts({
    filters: {
      featured: true,
    },
  });

  const products = response.data.products;

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-10">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-950">
          Productos destacados
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product) => {
          const image = product.images[0];

          return (
            <Link key={product.id} href={`/products/${product.slug}`} className="group block overflow-hidden rounded-xl border border-slate-200 bg-white">
              <article className="flex h-full flex-col justify-between">

                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={image.url}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-contain p-2 transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <p className="text-xs text-slate-500">
                    {getProductCategoryLabel(product.category)}
                  </p>

                  <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-slate-950">
                    {product.title}
                  </h3>

                  <p className="mt-2 text-lg font-bold text-slate-950">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}