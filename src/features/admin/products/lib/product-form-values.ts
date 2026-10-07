import type { Product } from "@/types/product";
import type { ProductFormValues } from "../schemas/product-form";
import { ProductGender, ProductSize } from "../../../../../generated/prisma/enums";

type ProductFormBasePayload = Omit<ProductFormValues, "price" | "stock" | "sizes" | "gender" | "colors" | "type" | "brand"> & {
  price: number;
  stock: number;
};

export type ProductFormPayload =
  | (ProductFormBasePayload & {
    category: "clothes";
    sizes: ProductSize[];
    gender: ProductGender;
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

export const getProductFormPayload = (values: ProductFormValues): ProductFormPayload => {
  const basePayload: ProductFormBasePayload = {
    title: values.title,
    price: Number(values.price),
    stock: Number(values.stock),
    description: values.description,
    category: values.category,
    isActive: values.isActive,
    isFeatured: values.isFeatured,
  };

  if (values.category === "clothes") {
    return {
      ...basePayload,
      category: values.category,
      sizes: values.sizes,
      gender: values.gender as ProductGender,
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
