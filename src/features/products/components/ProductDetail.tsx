"use client";

import Link from "next/link";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

import type { Product, SelectedVariants } from "../types/product";
import { ProductActions } from "./ProductActions";
import { ProductDetails } from "./ProductDetails";
import { ProductGallery } from "./ProductGallery";
import { ProductVariantSelector } from "./ProductVariantSelector";

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {

  const [selectedVariants, setSelectedVariants] = useState<SelectedVariants>({});

  return (
    <div className="rounded-3xl bg-white py-4 md:p-8 lg:p-10">
      <Link href="/products" className="mb-8 inline-flex items-center gap-3 text-sm font-bold text-slate-900 transition hover:text-slate-600">
        <FiArrowLeft className="size-5" />
        Volver a la tienda
      </Link>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.84fr)] lg:gap-12">
        <ProductGallery product={product} />

        <ProductDetails
          product={product}
          variants={product.category === "clothes" && (
            <ProductVariantSelector
              product={product}
              value={selectedVariants}
              onChange={setSelectedVariants}
            />
          )}
          actions={<ProductActions />}
        />
      </div>
    </div>
  );
};
