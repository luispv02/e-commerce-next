import type { Prisma } from "../../../../generated/prisma/client";
import type { Product } from "@/types/product";

type PrismaProduct = Prisma.ProductGetPayload<{
  include: {
    images: {
      select: {
        id: true;
        publicId: true;
        url: true;
      };
    };
  };
}>;

export const mapProduct = (product: PrismaProduct): Product => {
  const { id, title, price, description, slug, stock, isFeatured, category, images, isActive, } = product;

  const baseProduct = {
    id,
    title,
    price: Number(price),
    description,
    slug,
    stock,
    isFeatured,
    category,
    images,
    isActive,
  };

  switch (category) {
    case "clothes":
      return {
        ...baseProduct,
        category: "clothes",
        sizes: product.sizes,
        gender: product.gender ?? "",
        colors: product.colors,
        type: product.type ?? "",
      };

    case "technology":
      return {
        ...baseProduct,
        category: "technology",
        brand: product.brand ?? "",
        type: product.type ?? "",
      };

    case "others":
      return {
        ...baseProduct,
        category: "others",
      };
  }
};