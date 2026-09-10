import { notFound } from "next/navigation";

import { ProductDetail } from "@/features/products/components/ProductDetail";
import type { ProductResponse } from "@/types/product";
import { productsResponse } from "@/mocks/products";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = productsResponse.data.products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const response: ProductResponse = {
    ok: true,
    product,
  };


  return <ProductDetail product={response.product} />;
}
