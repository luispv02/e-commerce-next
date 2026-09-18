import { ProductsCategory } from "@/types/product";
import { ProductGender, ProductSize } from "../../../../generated/prisma/enums";

export interface ProductFilterOption {
  id: string;
  label: string;
  hex?: string;
}

export type ProductFilterKey = "sizes" | "gender" | "colors" | "type" | "brand";

export type ProductSort = "price-asc" | "price-desc" | "newest" | "oldest";

export interface ProductFilterConfig {
  title: string;
  filterKey: ProductFilterKey;
  multiple: boolean;
  options: ProductFilterOption[];
}

export interface PriceFilter {
  min?: number;
  max?: number;
}

export interface ProductFilters {
  search?: string;
  category?: ProductsCategory;
  price?: PriceFilter;
  sizes?: ProductSize[];
  gender?: ProductGender;
  colors?: string[];
  type?: string[];
  brand?: string[];
  sort?: ProductSort;
  page?: number;
  featured?: boolean;
}

export interface ProductSearchParams {
  search?: string | string[];
  category?: string | string[];
  price?: string | string[];
  sizes?: string | string[];
  gender?: string | string[];
  colors?: string | string[];
  type?: string | string[];
  brand?: string | string[];
  sort?: string | string[];
  page?: string | string[];
}
