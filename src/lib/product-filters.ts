import { clothesFilters, technologyFilters } from "@/config/product-filters";
import type { Filter, ProductFilterKey, } from "@/features/products/types/filters";
import type { ProductCategory, ProductsCategory } from "@/types/product";

export const productFiltersByCategory: Partial<Record<ProductsCategory, Filter[]>> = {
  clothes: clothesFilters,
  technology: technologyFilters,
};

export const getCategoryFilters = (category: ProductsCategory) => {
  return productFiltersByCategory[category] ?? [];
}


export const getProductFilter = (category: ProductCategory, filterKey: ProductFilterKey) => {
  return getCategoryFilters(category).find((filter) => filter.filterKey === filterKey);
}

export const getProductFilterOption = (category: ProductCategory, filterKey: ProductFilterKey, value: string) => {
  if (!value) {
    return undefined;
  }

  return getProductFilter(category, filterKey)?.options.find((option) => option.id === value);
};

export const getProductFilterLabel = (category: ProductCategory, filterKey: ProductFilterKey, value: string) => {
  return getProductFilterOption(category, filterKey, value)?.label ?? value;
}