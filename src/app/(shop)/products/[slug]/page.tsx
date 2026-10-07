import { notFound } from "next/navigation";

import { ProductDetail } from "@/features/products/components/ProductDetail";
import { getProductBySlugService } from "@/features/admin/products/services/product.service";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const response = await getProductBySlugService(slug);

  if (!response) {
    notFound();
  }
  return <ProductDetail product={response.product} />;
}
