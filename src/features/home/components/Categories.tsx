import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Ropa",
    productCount: 120,
    slug: "clothes",
    image: "/images/categories/clothes.png",
  },
  {
    name: "Tecnología",
    productCount: 85,
    slug: "technology",
    image: "/images/categories/tech.png",
  },
  {
    name: "Otros",
    productCount: 64,
    slug: "others",
    image: "/images/categories/others.png",
  }
];

export const PopularCategories = () => {
  return (
    <section className="pt-10">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-950">
          Categorías populares
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/products?category=${category.slug}`}
            className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-sm"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-slate-50">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="100vw"
                className="object-contain transition duration-300 group-hover:scale-105"
              />
            </div>

            <div className="border-t border-slate-100 px-4 py-3">
              <h3 className="text-sm font-semibold text-slate-950">
                {category.name}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {category.productCount} productos
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}