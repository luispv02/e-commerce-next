import Link from "next/link";
import { productCategories } from "../../config/categories";
import clsx from "clsx";


interface CategoryFiltersProps {
  activeCategory: string;
}

export function CategoryFilters({ activeCategory }: CategoryFiltersProps) {

  return (
    <div className="md:mt-6">
      <h3 className="text-sm font-semibold text-slate-950">
        Categorías
      </h3>

      <div className="mt-3 space-y-1">
        {productCategories.map((category) => {
          const isActive = activeCategory === category.id;
          const href = category.id === "all" ? "/products" : `/products?category=${category.id}`;

          return (
            <Link
              key={category.id}
              href={href}
              className={clsx("block rounded-md px-3 py-2 text-sm transition", isActive ? "bg-blue-50 font-medium text-blue-600" : "text-slate-600 hover:bg-slate-50")}
            >
              {category.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}