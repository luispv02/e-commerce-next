import { productFormSchema } from "../schemas/product-form";
import { getProductFormPayload, ProductFormPayload } from "./product-form-values";
import { UploadedProductImage } from "./upload-to-cloudinary";


export const parseProductData = (data: ProductFormPayload) => {
  const parsed = productFormSchema.safeParse({
    sizes: [],
    gender: "",
    colors: [],
    type: "",
    brand: "",
    ...data,
    price: String(data.price),
    stock: String(data.stock),
  });

  return parsed.success ? getProductFormPayload(parsed.data) : null;
};

export const areNewImagesValid = (images: UploadedProductImage[]) => {
  return Array.isArray(images) && images.every((image) =>
    typeof image.url === "string" &&
    image.url.startsWith(`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/`) &&
    typeof image.publicId === "string" &&
    image.publicId.startsWith("ecommerce-next/products/"),
  );
}

export const isValidImageCount = (count: number) => {
  return count >= 1 && count <= 6;
}