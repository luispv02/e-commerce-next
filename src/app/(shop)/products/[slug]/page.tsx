import { notFound } from "next/navigation";

import { ProductDetail } from "@/features/products/components/ProductDetail";
import { products } from "@/features/products/data/products";
import type { ProductResponse } from "@/features/products/types/product";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const response: ProductResponse = {
    ok: true,
    product,
  };


  return <ProductDetail product={response.product} />;
}
