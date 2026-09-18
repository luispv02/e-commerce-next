import { prisma } from "@/lib/prisma";
import type { ProductsListResponse } from "@/types/product-api";
import { mapProduct } from "../mappers/product.mapper";
import type { ProductFilters } from "../types/filters";
import { getProductFilters } from "@/lib/product-filter-query";
import { getOrderBy } from "@/lib/product-query-sort";

interface GetProductsParams {
  filters: ProductFilters;
}

export const getProducts = async ({ filters }: GetProductsParams): Promise<ProductsListResponse> => {

  const where = getProductFilters(filters);
  const orderBy = getOrderBy(filters.sort);

  const products = await prisma.product.findMany({
    where,
    orderBy,
    include: {
      images: {
        select: {
          id: true,
          publicId: true,
          url: true,
        }
      }
    }
  })

  return {
    ok: true,
    data: {
      pagination: {
        page: 0,
        limit: 0,
        totalProducts: 0,
        totalPages: 0,
      },
      products: products.map(mapProduct),
    }
  }
}
