import { ProductGender, ProductSize } from "../../generated/prisma/enums";

export type ProductCategory = "clothes" | "technology" | "others";
export type ProductsCategory = ProductCategory | "all";

export interface ProductImage {
  id: string;
  url: string;
  publicId: string;
}

interface BaseProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  isFeatured: boolean;
  category: ProductCategory;
  images: ProductImage[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClothesProduct extends BaseProduct {
  category: "clothes";
  sizes: ProductSize[];
  gender: ProductGender;
  colors: string[];
  type: string;
}

export interface TechnologyProduct extends BaseProduct {
  category: "technology";
  brand: string;
  type: string;
}

export interface OtherProduct extends BaseProduct {
  category: "others";
}

export type Product = ClothesProduct | TechnologyProduct | OtherProduct;

export interface ProductVariant {
  size?: string;
  color?: string;
};
