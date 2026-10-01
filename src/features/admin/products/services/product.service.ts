import { mapProduct } from "@/features/products/mappers/product.mapper";
import { ProductFilters } from "@/features/products/types/filters";
import { getPagination } from "@/lib/get-product-pagination";
import { prisma } from "@/lib/prisma";
import { getProductFilters } from "@/lib/product-filter-query";
import { getOrderBy } from "@/lib/product-query-sort";

interface getAdminProductsParams {
  filters: ProductFilters;
}

export const getProducts = async ({ filters }: getAdminProductsParams) => {

  const where = getProductFilters({ ...filters });
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
