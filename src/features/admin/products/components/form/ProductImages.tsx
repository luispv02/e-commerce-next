"use client";

import type { ProductImage } from "@/types/product";

import clsx from "clsx";
import Image from "next/image";
import { FiImage, FiTrash2, FiUpload } from "react-icons/fi";
import { FormSection } from "./FormSection";
import { MAX_PRODUCT_IMAGES, type NewProductFile } from "../../types/product-images";
import { FieldError } from "./FieldError";

type VisibleImage =
  | {
    id: string;
    source: "product";
    url: string;
  }
  | {
    id: string;
    source: "file";
    url: string;
  };

interface ProductImagesProps {
  files: NewProductFile[];
  productImages: ProductImage[];
  imagesError: string;
  activeImagesCount: number;
  onAddFiles: (files: FileList | null) => void;
  onRemoveFile: (fileId: string) => void;
  onRemoveProductImage: (imageId: string) => void;
}

export const ProductImages = ({ files, productImages, imagesError, activeImagesCount, onAddFiles, onRemoveFile, onRemoveProductImage }: ProductImagesProps) => {

  const visibleImages: VisibleImage[] = [
    ...productImages.map((image) => ({
      id: image.id,
      source: "product" as const,
      url: image.url,
    })),
    ...files.map((image) => ({
      id: image.id,
      source: "file" as const,
      url: image.url,
    })),
  ];

  const removeImage = (image: VisibleImage) => {
    if (image.source === "file") {
      onRemoveFile(image.id);
      return;
    }

    onRemoveProductImage(image.id);
  };

  return (
    <FormSection
      icon={<FiImage className="size-4" />}
      title={`Imágenes del producto (${activeImagesCount})`}
      subtitle="Sube y gestiona las imágenes del producto."
    >
      <label className={clsx("flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-slate-50 px-4 py-8 text-center transition hover:border-blue-400 hover:bg-blue-50/40", imagesError ? "border-red-300" : "border-slate-300")}
      >
        <FiUpload className="size-6 text-slate-400" />

        <span className="mt-2 text-sm font-medium text-slate-700">
          Haz clic para subir imágenes
        </span>

        <span className="mt-1 text-xs text-slate-500">
          PNG, JPG o WEBP (máx. 5MB c/u, hasta {MAX_PRODUCT_IMAGES} imágenes)
        </span>

        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          className="hidden"
          onChange={(event) => {
            onAddFiles(event.target.files);
            event.target.value = "";
          }}
        />
      </label>

      <FieldError message={imagesError} />

      {visibleImages.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {visibleImages.map((image, index) => (
            <div key={`${image.source}-${image.id}`} className="group relative overflow-hidden rounded-xl border border-slate-200">
              <Image
                width={100}
                height={100}
                src={image.url}
                alt={`Imagen ${index + 1}`}
                className="h-36 w-full object-contain sm:h-40"
                sizes="100vw"
                unoptimized={image.source === "file"}
              />

              <div className="absolute right-2 top-2">
                <button
                  type="button"
                  aria-label="Eliminar imagen"
                  onClick={() => removeImage(image)}
                  className="cursor-pointer inline-flex size-7 items-center justify-center rounded-md bg-white/90 text-red-500"
                >
                  <FiTrash2 className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </FormSection>
  );
};