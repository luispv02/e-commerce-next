"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Product } from "@/types/product";
import { type FormEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { getProductFormPayload, getProductFormValues } from "../../lib/product-form-values";
import { productFormSchema, type ProductFormValues } from "../../schemas/product-form";
import { CategoryFields } from "./CategoryFields";
import { ProductFormHeader } from "./ProductFormHeader";
import { ProductGeneralInfo } from "./ProductGeneralInfo";
import { ProductImages } from "./ProductImages";
import { ProductMetadata } from "./ProductMetadata";
import { ProductVisibility } from "./ProductVisibility";
import { useProductImages } from "../../hooks/useProductImages";

interface ProductFormProps {
  mode: "create" | "edit";
  product?: Product;
}

export const ProductForm = ({ mode, product }: ProductFormProps) => {
  const { files, productImages, deletedImages, imagesError, activeImagesCount, addFiles, removeFile, removeProductImage, validateImages, } = useProductImages(product?.images);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: getProductFormValues(product),
  });

  const onSubmit = (values: ProductFormValues) => {
    if (!validateImages()) return;

    console.log("Product form", getProductFormPayload(values, {
      files,
      productImages,
      deletedImages,
    }));
  };

  const handleInvalidSubmit = () => {
    validateImages();
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    void form.handleSubmit(onSubmit, handleInvalidSubmit)(event);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleFormSubmit} className="mx-auto w-full max-w-350 space-y-6">
        <ProductFormHeader mode={mode} />

        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:gap-6">
          <div className="space-y-4">
            <ProductGeneralInfo categoryLocked={mode === "edit"} />
            <CategoryFields />
          </div>

          <div className="space-y-4">
            <ProductImages
              files={files}
              productImages={productImages}
              imagesError={imagesError}
              activeImagesCount={activeImagesCount}
              onAddFiles={addFiles}
              onRemoveFile={removeFile}
              onRemoveProductImage={removeProductImage}
            />

            <ProductVisibility />
            {mode === "edit" && product && <ProductMetadata productId={product.id} />}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
