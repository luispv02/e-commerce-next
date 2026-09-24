import { Product, ProductVariant } from "@/types/product";

export interface Cart {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  items: CartItem[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  stockAvailable: number;
  variants?: ProductVariant;
}

export interface AddCartItem {
  productId: string;
  quantity: number;
  variants?: ProductVariant;
}

export interface CartActionResponse {
  success: boolean;
  message: string;
  code?: string;
}