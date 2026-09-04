export type ProductCategory = "clothes" | "technology" | "others";

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
}

export interface ClothesProduct extends BaseProduct {
  category: "clothes";
  sizes: string[];
  gender: string;
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

export interface ProductResponse {
  ok: boolean;
  product: Product;
}

export interface SelectedVariants {
  size?: string;
  color?: string;
};
