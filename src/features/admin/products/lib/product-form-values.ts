import type { Product, ProductImage } from "@/types/product";
import type { NewProductFile, ProductImagesState } from "../types/product-images";
import type { ProductFormValues } from "../schemas/product-form";

type ProductFormBasePayload = Omit<ProductFormValues, "price" | "stock" | "sizes" | "gender" | "colors" | "type" | "brand"> & {
  price: number;
  stock: number;
  files: NewProductFile[];
  productImages: ProductImage[];
  deletedImages: ProductImage[];
};

export type ProductFormPayload =
  | (ProductFormBasePayload & {
    category: "clothes";
    sizes: string[];
    gender: string;
    colors: string[];
    type: string;
  })
  | (ProductFormBasePayload & {
    category: "technology";
    type: string;
    brand: string;
  })
  | (ProductFormBasePayload & {
    category: "others";
  });

export const emptyProductFormValues: ProductFormValues = {
  title: "",
  price: "",
  stock: "",
  description: "",
  category: "",
  sizes: [],
  gender: "",
  colors: [],
  type: "",
  brand: "",
  isActive: true,
  isFeatured: false,
};

export const getProductFormValues = (product?: Product): ProductFormValues => {
  if (!product) {
    return emptyProductFormValues;
  }

  return {
    title: product.title,
    price: String(product.price),
    stock: String(product.stock),
    description: product.description,
    category: product.category,
    sizes: product.category === "clothes" ? product.sizes : [],
    gender: product.category === "clothes" ? product.gender : "",
    colors: product.category === "clothes" ? product.colors : [],
    type: product.category === "clothes" || product.category === "technology" ? product.type : "",
    brand: product.category === "technology" ? product.brand : "",
    isActive: product.isActive,
    isFeatured: product.isFeatured,
  };
};

export const getProductFormPayload = (values: ProductFormValues, images: ProductImagesState,): ProductFormPayload => {
  const basePayload: ProductFormBasePayload = {
    title: values.title,
    price: Number(values.price),
    stock: Number(values.stock),
    description: values.description,
    category: values.category,
    isActive: values.isActive,
    isFeatured: values.isFeatured,
    files: images.files,
    productImages: images.productImages,
    deletedImages: images.deletedImages,
  };

  if (values.category === "clothes") {
    return {
      ...basePayload,
      category: values.category,
      sizes: values.sizes,
      gender: values.gender,
      colors: values.colors,
      type: values.type,
    };
  }

  if (values.category === "technology") {
    return {
      ...basePayload,
      category: values.category,
      type: values.type,
      brand: values.brand,
    };
  }

  if (values.category === "others") {
    return {
      ...basePayload,
      category: values.category,
    };
  }

  throw new Error("Product category is required to build the payload.");
};
