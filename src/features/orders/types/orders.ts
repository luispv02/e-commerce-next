import { ProductImage, ProductVariant } from "@/types/product";

export type OrderStatus = "PENDING" | "PAID" | "CANCELLED";

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  title: string;
  description: string;
  images: ProductImage[];
  quantity: number;
  pricePaid: number;
  variants?: ProductVariant;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  neighborhood: string;
  postalCode: string;
  city: string;
  state: string;
  references?: string;
}