import { notFound } from "next/navigation";

import { ProductDetail } from "@/features/products/components/ProductDetail";
import { getProductBySlug } from "@/features/products/services/product.service";
import { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const generateMetadata = async ({ params }: ProductPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const response = await getProductBySlug(slug);

  if (!response) {
    return {
      title: "Producto no encontrado",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { product } = response;

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images[0]?.url ? [product.images[0].url] : []
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const response = await getProductBySlug(slug);

  if (!response) {
    notFound();
  }
  return <ProductDetail product={response.product} />;
}
