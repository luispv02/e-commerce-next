"use client";

import { useState } from "react";
import { MAX_PRODUCT_IMAGE_SIZE, MAX_PRODUCT_IMAGES, type NewProductFile } from "../types/product-images";
import type { ProductImage } from "@/types/product";

export const useProductImages = (initialImages: ProductImage[] = []) => {

  const [files, setFiles] = useState<NewProductFile[]>([]);
  const [productImages, setProductImages] = useState<ProductImage[]>(initialImages);
  const [deletedImages, setDeletedImages] = useState<ProductImage[]>([]);
  const [imagesError, setImagesError] = useState("");


  const activeImagesCount = files.length + productImages.length;

  const validateImages = () => {
    if (activeImagesCount === 0) {
      setImagesError("Agrega al menos una imagen del producto");
      return false;
    }

    if (activeImagesCount > MAX_PRODUCT_IMAGES) {
      setImagesError(`Puedes agregar máximo ${MAX_PRODUCT_IMAGES} imágenes`);
      return false;
    }

    setImagesError("");
    return true;
  };

  const addFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles?.length) return;

    const selectedImages = Array.from(selectedFiles);
    const availableSlots = MAX_PRODUCT_IMAGES - activeImagesCount;

    if (selectedImages.length > availableSlots) {
      setImagesError(availableSlots > 0
        ? `Solo puedes agregar ${availableSlots} imagen${availableSlots === 1 ? "" : "es"} más`
        : `Puedes agregar máximo ${MAX_PRODUCT_IMAGES} imágenes`,
      );
      return;
    }

    const oversizedFile = selectedImages.find((file) => file.size > MAX_PRODUCT_IMAGE_SIZE);
    if (oversizedFile) {
      setImagesError("Cada imagen debe pesar máximo 5MB");
      return;
    }

    const nextFiles = selectedImages.map((file) => ({
      id: crypto.randomUUID(),
      file,
      url: URL.createObjectURL(file),
    }));

    setImagesError("");
    setFiles((currentFiles) => [...currentFiles, ...nextFiles]);
  };

  const removeFile = (fileId: string) => {
    const removedFile = files.find((file) => file.id === fileId);

    if (!removedFile) return;

    URL.revokeObjectURL(removedFile.url);

    setFiles((currentFiles) => currentFiles.filter((file) => file.id !== fileId));

    if (activeImagesCount === 1) {
      setImagesError("Agrega al menos una imagen del producto");
    }
  };

  const removeProductImage = (imageId: string) => {
    const removedProductImage = productImages.find((image) => image.id === imageId);

    if (!removedProductImage) return;

    setProductImages((currentImages) => currentImages.filter((image) => image.id !== imageId));

    setDeletedImages((currentDeleted) => [
      ...currentDeleted,
      removedProductImage,
    ]);

    if (activeImagesCount === 1) {
      setImagesError("Agrega al menos una imagen del producto");
    }
  };

  return {
    files,
    productImages,
    deletedImages,
    imagesError,
    activeImagesCount,
    addFiles,
    removeFile,
    removeProductImage,
    validateImages
  }
}