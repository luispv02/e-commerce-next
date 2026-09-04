import { Product, ProductVariant } from "@/features/products/types/product";

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


