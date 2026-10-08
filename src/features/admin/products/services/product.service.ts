import { mapProduct } from "@/features/products/mappers/product.mapper";
import { ProductFilters } from "@/features/products/types/filters";
import { getPagination } from "@/lib/get-product-pagination";
import { prisma } from "@/lib/prisma";
import { getProductFilters } from "@/lib/product-filter-query";
import { getOrderBy } from "@/lib/product-query-sort";
import { ProductResponse, ProductsListResponse } from "@/types/product-response";
import { slugify } from "../lib/slugify";
import { ActionResult, CreateProductActionPayload, UpdateProductActionPayload } from "../types/product-actions";
import { CustomError } from "@/lib/custom-error";
import { deleteCloudinaryImages } from "../actions/delete-cloudinary-images";
import { areNewImagesValid, isValidImageCount, parseProductData } from "../lib/product-service-helpers";
import { z } from "zod";


interface getAdminProductsParams {
  filters: ProductFilters;
}

export const getProductsService = async ({ filters }: getAdminProductsParams): Promise<ProductsListResponse> => {

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

export const getProductBySlugService = async (slug: string): Promise<ProductResponse | null> => {
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      images: {
        select: {
          id: true,
          publicId: true,
          url: true,
        },
      },
    },
  });

  if (!product) {
    return null;
  }

  return {
    ok: true,
    product: mapProduct(product),
  };
}

export const createProductService = async (payload: CreateProductActionPayload): Promise<ActionResult> => {
  const { newImages, ...data } = payload;

  const productData = parseProductData(data);

  if (!productData) {
    return {
      success: false as const,
      message: "Los datos del producto no son válidos",
    };
  }

  if (!areNewImagesValid(newImages)) {
    return {
      success: false as const,
      message: "Las imágenes no son válidas",
    };
  }

  if (!isValidImageCount(newImages.length)) {
    return {
      success: false as const,
      message: "El producto debe tener entre 1 y 6 imágenes",
    };
  }

  const slug = slugify(productData.title);

  try {

    await prisma.product.create({
      data: {
        ...productData,
        slug,
        images: {
          create: newImages.map(({ url, publicId }) => ({
            url,
            publicId
          }))
        },
      },
      include: {
        images: {
          select: {
            id: true,
            url: true,
            publicId: true,
          },
        },
      },
    })

    return {
      success: true as const,
      message: "Producto creado correctamente",
    };
  } catch (error) {
    console.error("Error al crear el producto", error);

    return {
      success: false as const,
      message: "No se pudo crear el producto",
    };
  }
};

export const updateProductService = async (payload: UpdateProductActionPayload): Promise<ActionResult> => {

  const { productId, newImages, deletedImages, ...data } = payload;

  const productData = parseProductData(data);

  if (!productData) {
    return {
      success: false as const,
      message: "Los datos del producto no son válidos"
    };
  }

  if (!areNewImagesValid(newImages) || !Array.isArray(deletedImages)) {
    return {
      success: false as const,
      message: "Las imágenes no son válidas"
    };
  }

  const deletedImageIds = [...new Set(deletedImages.map((image) => image.id))];

  try {
    const removedPublicIds = await prisma.$transaction(async (tx) => {

      const existingProduct = await tx.product.findUnique({
        where: { id: productId },
        select: {
          category: true,
          images: {
            select: {
              id: true,
              publicId: true
            }
          }
        },
      });

      if (!existingProduct) {
        throw new CustomError("El producto no existe");
      }

      if (productData.category !== existingProduct.category) {
        throw new CustomError("No se puede cambiar la categoría");
      }

      const imagesToDelete = existingProduct.images.filter((image) => deletedImageIds.includes(image.id));

      if (imagesToDelete.length !== deletedImageIds.length) {
        throw new CustomError("Las imágenes a eliminar no son válidas");
      }

      const finalCount = existingProduct.images.length - imagesToDelete.length + newImages.length;

      if (!isValidImageCount(finalCount)) {
        throw new CustomError(`El producto debe tener entre 1 y 6 imágenes`);
      }

      await tx.product.update({
        where: { id: productId },
        data: {
          ...productData,
          images: {
            deleteMany: {
              id: {
                in: imagesToDelete.map((image) => image.id)
              }
            },
            create: newImages.map(({ url, publicId }) => ({ url, publicId })),
          },
        },
      });

      return imagesToDelete.map((image) => image.publicId);
    });

    if (removedPublicIds.length > 0) {
      try {
        await deleteCloudinaryImages(removedPublicIds);
      } catch (error) {
        console.error("No se pudieron borrar imágenes de Cloudinary", error);
      }
    }

    return {
      success: true as const,
      message: "Producto actualizado correctamente"
    };
  } catch (error) {

    console.error("Error al actualizar el producto", error);
    return {
      success: false as const,
      message: "No se pudo actualizar el producto"
    };
  }
};

export const deleteProductService = async (productId: string): Promise<ActionResult> => {

  if (!z.uuid().safeParse(productId).success) {
    return {
      success: false,
      message: "El producto no es válido",
    };
  }
  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: productId },
      select: {
        images: {
          select: { publicId: true },
        },
      },
    });

    const publicIds = deletedProduct.images.map((image) => image.publicId);

    if (publicIds.length > 0) {
      try {
        await deleteCloudinaryImages(publicIds);
      } catch (error) {
        console.error("No se pudieron borrar las imágenes de Cloudinary", error);
      }
    }

    return {
      success: true,
      message: "Producto eliminado correctamente",
    };
  } catch (error) {
    console.error("Error al eliminar el producto", error);

    return {
      success: false,
      message: "No se pudo eliminar el producto",
    };
  }
};
