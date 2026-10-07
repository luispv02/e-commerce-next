import { ProductForm } from "@/features/admin/products/components/form/ProductForm";
import { getProductBySlugService } from "@/features/admin/products/services/product.service";
import { notFound } from "next/navigation";

interface AdminEditProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AdminEditProductPage({ params, }: AdminEditProductPageProps) {

  const { slug } = await params;
  const productResponse = await getProductBySlugService(slug);

  if (!productResponse) {
    notFound();
  }

  return <ProductForm mode="edit" product={productResponse.product} />;
}
