
import { Prisma } from "../../../../generated/prisma/client";
import type { ProductImage, ProductVariant } from "@/types/product";
import type { Order, OrderItem, ShippingAddress } from "../types/orders";

export const mapOrder = (order: {
  id: string;
  userId: string;
  status: Order["status"];
  shippingAddress: unknown;
  total: Prisma.Decimal | number;
  createdAt: Date;
  updatedAt: Date;
  items: Array<{
    id: string;
    orderId: string;
    productId: string;
    title: string;
    description: string;
    images: unknown;
    quantity: number;
    pricePaid: Prisma.Decimal | number;
    variants: unknown;
  }>;
}): Order => ({
  id: order.id,
  userId: order.userId,
  status: order.status,
  shippingAddress: order.shippingAddress as unknown as ShippingAddress,
  total: Number(order.total),
  createdAt: order.createdAt.toISOString(),
  updatedAt: order.updatedAt.toISOString(),
  items: order.items.map((item): OrderItem => ({
    id: item.id,
    orderId: item.orderId,
    productId: item.productId,
    title: item.title,
    description: item.description,
    images: item.images as unknown as ProductImage[],
    quantity: item.quantity,
    pricePaid: Number(item.pricePaid),
    variants: item.variants ? (item.variants as unknown as ProductVariant) : undefined,
  })),
});