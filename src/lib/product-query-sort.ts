import { ProductSort } from "@/features/products/types/filters";
import { Prisma } from "../../generated/prisma/client";

export const getOrderBy = (sort: ProductSort = "newest"): Prisma.ProductOrderByWithRelationInput => {
  switch (sort) {
    case "price-asc":
      return { price: 'asc' };
    case "price-desc":
      return { price: 'desc' }
    case "newest":
      return { createdAt: 'desc' };
    case "oldest":
      return { createdAt: 'asc' };
    default:
      return { createdAt: 'asc' };
  }
};