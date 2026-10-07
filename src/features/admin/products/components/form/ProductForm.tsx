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
import { getUploadSignature } from "../../actions/get-upload-signature";
import { UploadedProductImage, uploadToCloudinary } from "../../lib/upload-to-cloudinary";
import { createProduct } from "../../actions/create-product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteCloudinaryImages } from "../../actions/delete-cloudinary-images";
import clsx from "clsx";
import { updateProduct } from "../../actions/update-product";

interface ProductFormProps {
  mode: "create" | "edit";
  product?: Product;
}

export const ProductForm = ({ mode, product }: ProductFormProps) => {
  const { files, productImages, deletedImages, imagesError, activeImagesCount, addFiles, removeFile, removeProductImage, validateImages, } = useProductImages(product?.images);
  const router = useRouter()

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: getProductFormValues(product),
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: ProductFormValues) => {
    if (!validateImages()) return;

    let uploadedImages: UploadedProductImage[] = [];

    try {
      const data = getProductFormPayload(values);

      // Upload selected new images
      if (files.length > 0) {
        const signatureResponse = await getUploadSignature();

        if (!signatureResponse.success) {
          throw new Error(signatureResponse.message);
        }

        const results = await Promise.allSettled(
          files.map(({ file }) =>
            uploadToCloudinary(file, signatureResponse.data)
          ),
        );

        uploadedImages = results.flatMap((result) =>
          result.status === "fulfilled" ? [result.value] : [],
        );

        if (uploadedImages.length !== files.length) {
          throw new Error("No se pudieron subir todas las imágenes");
        }
      }

      const result = mode === "create"
        ? await createProduct({ ...data, newImages: uploadedImages })
        : await updateProduct({ ...data, productId: product!.id, newImages: uploadedImages, deletedImages, })

      if (!result.success) {
        throw new Error(result.message);
      }

      toast.success(mode === "create" ? "Producto creado correctamente" : "Producto actualizado correctamente",);
      router.push("/admin/products");
      router.refresh();

    } catch (error) {
      if (uploadedImages.length > 0) {
        try {
          await deleteCloudinaryImages(uploadedImages.map((i) => i.publicId));
        } catch (cleanupError) {
          console.error("No se pudo limpiar Cloudinary", cleanupError);
        }
      }

      toast.error(error instanceof Error ? error.message : "Error al guardar el producto");
    }
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
        <fieldset disabled={isSubmitting} className={clsx("space-y-6 transition-opacity", isSubmitting && "opacity-60 pointer-events-none",)} >
          <ProductFormHeader mode={mode} isSubmitting={isSubmitting} />

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
        </fieldset>
      </form>
    </FormProvider>
  );
};
