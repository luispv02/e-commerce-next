
import type { ProductsCategory } from "@/types/product";
import type { ProductFilterKey, ProductFilters, ProductSort } from "../types/filters";
import { ProductGender, ProductSize } from "../../../../generated/prisma/enums";
import { productCategories } from "../config/categories";
import { getProductFilter } from "@/lib/product-filter-config";


const PRODUCT_SORTS: ProductSort[] = [
  "price-asc",
  "price-desc",
  "newest",
  "oldest",
];

const parseArrayParam = (value: string | string[] | undefined): string[] => {
  if (!value) {
    return [];
  }

  const normalizedValue = Array.isArray(value) ? value[0] : value;

  return normalizedValue
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const parsePriceParam = (value: string | string[] | undefined): ProductFilters["price"] => {
  if (!value) {
    return undefined;
  }

  const normalizedValue = Array.isArray(value) ? value[0] : value;

  const [minValue, maxValue] = normalizedValue.split("-");

  const min = minValue ? Number(minValue) : undefined;
  const max = maxValue ? Number(maxValue) : undefined;

  const hasValidMin = min !== undefined && Number.isFinite(min);
  const hasValidMax = max !== undefined && Number.isFinite(max);

  if (!hasValidMin && !hasValidMax) {
    return undefined;
  }

  return {
    ...(hasValidMin && { min }),
    ...(hasValidMax && { max }),
  };
};

const parsePageParam = (value: string | string[] | undefined): number => {
  if (!value) {
    return 1;
  }

  const normalizedValue = Array.isArray(value) ? value[0] : value;

  const page = Number(normalizedValue);

  return Number.isInteger(page) && page > 0 ? page : 1;
};

const getValidFilterValues = (category: ProductsCategory, filterKey: ProductFilterKey, values: string[]): string[] => {
  const filter = getProductFilter(category, filterKey);

  if (!filter) {
    return [];
  }

  return values.filter((value) => filter.options.some((option) => option.id === value));
};

export const parseProductSearchParams = (params: Record<string, string | string[] | undefined>): ProductFilters => {
  const searchParam = Array.isArray(params.search) ? params.search[0] : params.search;
  const categoryParam = Array.isArray(params.category) ? params.category[0] : params.category;

  const genderParam = Array.isArray(params.gender) ? params.gender[0] : params.gender;
  const sortParam = Array.isArray(params.sort) ? params.sort[0] : params.sort;

  const category = productCategories.some((option) => option.id === categoryParam) ? (categoryParam as ProductsCategory) : "all";
  const search = searchParam?.trim();
  const sizes = getValidFilterValues(category, "sizes", parseArrayParam(params.sizes)) as ProductSize[];
  const genderValue = genderParam ? getValidFilterValues(category, "gender", [genderParam])[0] : undefined;
  const gender = genderValue as ProductGender | undefined;
  const colors = getValidFilterValues(category, "colors", parseArrayParam(params.colors));
  const type = getValidFilterValues(category, "type", parseArrayParam(params.type));
  const brand = getValidFilterValues(category, "brand", parseArrayParam(params.brand));
  const sort = sortParam && PRODUCT_SORTS.includes(sortParam as ProductSort) ? (sortParam as ProductSort) : undefined;
  const price = parsePriceParam(params.price);
  const page = parsePageParam(params.page);

  return {
    category,
    ...(search && { search }),
    ...(price && { price }),
    ...(sizes.length > 0 && { sizes }),
    ...(gender && { gender }),
    ...(colors.length > 0 && { colors }),
    ...(type.length > 0 && { type }),
    ...(brand.length > 0 && { brand }),
    ...(sort && { sort }),
    page,
  };
};