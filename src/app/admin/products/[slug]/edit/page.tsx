import { ProductForm } from "@/features/admin/products/components/form/ProductForm";
import { productsResponse } from "@/mocks/products";
import { notFound } from "next/navigation";

interface AdminEditProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AdminEditProductPage({ params, }: AdminEditProductPageProps) {

  const { slug } = await params;
  
  const product = productsResponse.data.products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductForm mode="edit" product={product} />;
}
