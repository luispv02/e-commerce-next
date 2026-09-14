import { prisma } from "../lib/prisma";
import { productsResponse } from "../mocks/products";
import type { ProductCategory, ProductGender, ProductSize, Prisma, } from "../../generated/prisma/client";

const products = productsResponse.data.products;

const productData = products.map((product): Prisma.ProductCreateInput => ({
  id: product.id,
  title: product.title,
  price: product.price,
  description: product.description,
  slug: product.slug,
  stock: product.stock,
  isFeatured: product.isFeatured,
  category: product.category as ProductCategory,
  isActive: product.isActive,
  sizes: "sizes" in product ? (product.sizes as ProductSize[]) : [],
  gender: "gender" in product ? (product.gender as ProductGender) : null,
  colors: "colors" in product ? product.colors : [],
  brand: "brand" in product ? product.brand : null,
  type: "type" in product ? product.type : null,
  images: {
    create: product.images.map((image) => ({
      id: image.id,
      url: image.url,
      publicId: image.publicId,
    })),
  },
}));

async function main() {
  await prisma.$transaction(async (tx) => {
    await tx.productImage.deleteMany();
    await tx.product.deleteMany();

    for (const product of productData) {
      await tx.product.create({ data: product });
    }
  });

  console.log(`Seed completado: ${productData.length} productos creados.`);
}

main()
  .catch((error) => {
    console.error("Error ejecutando el seed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
