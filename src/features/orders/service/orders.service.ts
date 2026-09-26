
import { Prisma } from "../../../../generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type { ProductImage, ProductVariant } from "@/types/product";
import type { Order, OrderItem, ShippingAddress } from "../types/orders";
import type { ShippingAddressFormData } from "@/features/checkout/schemas/address";
import { CustomError } from "@/lib/custom-error";

interface CreateOrderServiceData {
  userId: string;
  shippingAddress: ShippingAddressFormData;
}

export const createOrderService = async ({ userId, shippingAddress }: CreateOrderServiceData) => {
  return prisma.$transaction(async (tx) => {

    // Get the user cart
    const cart = await tx.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new CustomError("El carrito está vacío.", 400);
    }

    // group the total quantity of each product.
    const productQuantities = new Map<string, { quantity: number; title: string }>();

    for (const item of cart.items) {
      const product = item.product;

      if (!product.isActive) {
        throw new CustomError(`El producto "${product.title}" ya no está disponible.`, 404);
      }

      const existing = productQuantities.get(product.id);

      productQuantities.set(product.id, {
        quantity: (existing?.quantity ?? 0) + item.quantity,
        title: product.title,
      });
    }

    // Calculate the total on the server
    const total = cart.items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);

    //Create the order
    const order = await tx.order.create({
      data: {
        userId,
        total,
        status: "PAID",
        shippingAddress: shippingAddress as Prisma.InputJsonValue,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            title: item.product.title,
            description: item.product.description,
            images: item.product.images as Prisma.InputJsonValue,
            quantity: item.quantity,
            pricePaid: item.product.price,
            variants: item.variants ? (item.variants as Prisma.InputJsonValue) : Prisma.JsonNull,
          })),
        },
      },
    });

    // Deduct stock
    for (const [productId, { quantity, title }] of productQuantities) {
      const result = await tx.product.updateMany({
        where: {
          id: productId,
          stock: { gte: quantity },
        },
        data: {
          stock: { decrement: quantity },
        },
      });

      if (result.count === 0) {
        throw new CustomError(`No hay suficiente stock de "${title}".`, 400);
      }
    }

    // Empty cart
    await tx.cartItem.deleteMany({
      where: {
        cartId: cart.id
      },
    });

    return order;
  });
};

export const getOrdersService = async (userId: string): Promise<Order[]> => {
  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders.map((order) => ({
    id: order.id,
    userId: order.userId,
    status: order.status,
    shippingAddress: order.shippingAddress as unknown as ShippingAddress,
    total: Number(order.total),
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
    items: order.items.map(
      (item): OrderItem => ({
        id: item.id,
        orderId: item.orderId,
        productId: item.productId,
        title: item.title,
        description: item.description,
        images: item.images as unknown as ProductImage[],
        quantity: item.quantity,
        pricePaid: Number(item.pricePaid),
        variants: item.variants ? (item.variants as unknown as ProductVariant) : undefined,
      }),
    ),
  }));
};

