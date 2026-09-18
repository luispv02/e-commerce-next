"use client";

import Link from "next/link";
import { productCategories } from "../../config/categories";
import clsx from "clsx";
import { ProductsCategory } from "@/types/product";
import { useFilterUpdater } from "../../hooks/useFilterUpdater";


interface CategoryFiltersProps {
  activeCategory: ProductsCategory;
  mode?: "desktop" | "mobile";
  draftParams?: URLSearchParams;
  onDraftChange?: (params: URLSearchParams) => void;
}

export function CategoryFilters({ activeCategory, mode = "desktop", draftParams, onDraftChange, }: CategoryFiltersProps) {

  const { params, updateParams } = useFilterUpdater({ mode, draftParams, onDraftChange });

  const handleCategoryChange = (categoryId: ProductsCategory) => {
    const newParams = new URLSearchParams(params.toString());

    if (categoryId === "all") {
      newParams.delete("category");
    } else {
      newParams.set("category", categoryId);
    }

    newParams.delete("sizes");
    newParams.delete("gender");
    newParams.delete("colors");
    newParams.delete("type");
    newParams.delete("brand");

    newParams.set("page", "1");
    updateParams(newParams);
  };


  return (
    <div className="md:mt-6">
      <h3 className="text-sm font-semibold text-slate-950">
        Categorías
      </h3>

      <div className="mt-3 space-y-1">
        {productCategories.map((category) => {
          const isActive = activeCategory === category.id;

          if (mode === "desktop") {
            const href = category.id === "all" ? "/products" : `/products?category=${category.id}`;

            return (
              <Link
                key={category.id}
                href={href}
                className={clsx("block rounded-md px-3 py-2 text-sm transition", isActive
                  ? "bg-blue-50 font-medium text-blue-600"
                  : "text-slate-600 hover:bg-slate-50"
                )}
              >
                {category.label}
              </Link>
            );
          }

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => handleCategoryChange(category.id as ProductsCategory)}
              className={clsx("block w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm transition", isActive
                ? "bg-blue-50 font-medium text-blue-600"
                : "text-slate-600 hover:bg-slate-50"
              )}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}