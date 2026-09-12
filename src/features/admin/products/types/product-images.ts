import type { ProductImage } from "@/types/product";

export const MAX_PRODUCT_IMAGES = 6;
export const MAX_PRODUCT_IMAGE_SIZE = 5 * 1024 * 1024;

export interface NewProductFile {
  id: string;
  file: File;
  url: string;
}

export interface ProductImagesState {
  files: NewProductFile[];
  productImages: ProductImage[];
  deletedImages: ProductImage[];
}
