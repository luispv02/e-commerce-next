import { clothesFilters, technologyFilters } from "@/config/product-filters";
import type { ProductFilterConfig, ProductFilterKey, } from "@/features/products/types/filters";
import type { ProductsCategory } from "@/types/product";

export const productFiltersByCategory: Partial<Record<ProductsCategory, ProductFilterConfig[]>> = {
  clothes: clothesFilters,
  technology: technologyFilters,
};

export const getCategoryFilters = (category: ProductsCategory) => {
  return productFiltersByCategory[category] ?? [];
}

export const getProductFilter = (category: ProductsCategory, filterKey: ProductFilterKey) => {
  return getCategoryFilters(category).find((filter) => filter.filterKey === filterKey);
}

export const getProductFilterOption = (category: ProductsCategory, filterKey: ProductFilterKey, value: string) => {
  if (!value) {
    return undefined;
  }

  return getProductFilter(category, filterKey)?.options.find((option) => option.id === value);
};

export const getProductFilterLabel = (category: ProductsCategory, filterKey: ProductFilterKey, value: string) => {
  return getProductFilterOption(category, filterKey, value)?.label ?? value;
}