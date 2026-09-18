import type { PriceFilter } from "@/features/products/types/filters";
import type { ProductsCategory } from "@/types/product";
import type { ProductGender, ProductSize } from "../../generated/prisma/enums";
import type { Prisma } from "../../generated/prisma/client";

interface ProductWhereFilters {
  search?: string;
  category?: ProductsCategory;
  price?: PriceFilter;
  sizes?: ProductSize[];
  gender?: ProductGender;
  colors?: string[];
  type?: string[];
  brand?: string[];
  featured?: boolean;
  isActive?: boolean;
}

export const getProductFilters = ({ search, category, price, sizes, gender, colors, type, brand, featured, isActive, }: ProductWhereFilters): Prisma.ProductWhereInput => {
  const searchQuery = search?.trim()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((term) => `${term}:*`)
    .join(" & ");

  return {
    ...(isActive !== undefined && { isActive }),
    ...(searchQuery && {
      OR: [
        {
          title: {
            search: searchQuery,
          },
        },
        {
          description: {
            search: searchQuery,
          },
        },
        {
          brand: {
            search: searchQuery,
          },
        },
      ],
    }),

    ...((category && category !== "all") && { category }),
    ...((price?.min !== undefined || price?.max !== undefined) && {
      price: {
        ...(price.min !== undefined && { gte: price.min }),
        ...(price.max !== undefined && { lte: price.max }),
      },
    }),
    ...(sizes?.length && {
      sizes: { hasSome: sizes },
    }),
    ...(gender && { gender }),
    ...(colors?.length && {
      colors: { hasSome: colors },
    }),
    ...(type?.length && {
      type: { in: type },
    }),
    ...(brand?.length && {
      brand: { in: brand },
    }),
    ...(featured !== undefined && { isFeatured: featured }),
  };
};