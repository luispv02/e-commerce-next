import { ProductFormPayload } from "../lib/product-form-values";
import { UploadedProductImage } from "../lib/upload-to-cloudinary";


export type CreateProductActionPayload = ProductFormPayload & {
  newImages: UploadedProductImage[];
};

export type UpdateProductActionPayload = ProductFormPayload & {
  productId: string;
  newImages: UploadedProductImage[];
  deletedImages: {
    id: string;
    publicId: string;
    url: string;
  }[];
};


export interface ActionResult {
  success: boolean;
  message: string;
}

export interface UpdateProductStatusPayload {
  productId: string;
  isActive: boolean;
}