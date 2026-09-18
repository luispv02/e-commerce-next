import { prisma } from "@/lib/prisma";
import type { ProductsListResponse } from "@/types/product-api";
import { mapProduct } from "../mappers/product.mapper";
import type { ProductFilters } from "../types/filters";
import { getProductFilters } from "@/lib/product-filter-query";
import { getOrderBy } from "@/lib/product-query-sort";
import { getPagination } from "@/lib/get-product-pagination";

interface GetProductsParams {
  filters: ProductFilters;
}

export const getProducts = async ({ filters }: GetProductsParams): Promise<ProductsListResponse> => {

  const where = getProductFilters({ ...filters, isActive: true });
  const orderBy = getOrderBy(filters.sort);

  const { page, limit, skip } = getPagination({ page: filters.page });

  const [products, totalProducts] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        images: {
          select: {
            id: true,
            publicId: true,
            url: true,
          },
        },
      },
    }),

    prisma.product.count({
      where,
    }),
  ]);

  return {
    ok: true,
    data: {
      pagination: {
        page,
        limit,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
      },
      products: products.map(mapProduct),
    }
  }
}
