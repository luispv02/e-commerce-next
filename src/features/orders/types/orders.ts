import { ProductImage, ProductVariant } from "@/features/products/types/product";


export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  title: string;
  description: string;
  images: ProductImage[];
  quantity: number;
  pricePaid: number;
  variants?: ProductVariant;
}