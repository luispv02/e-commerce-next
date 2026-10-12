
import { Prisma } from "../../../../generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type { Order } from "../types/orders";
import type { ShippingAddressFormData } from "@/features/checkout/schemas/address";
import { CustomError } from "@/lib/custom-error";
import { mapOrder } from "../mappers/order.mapper";

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

  return orders.map(mapOrder);
};

export const getOrderByIdService = async (orderId: string, userId: string): Promise<Order | null> => {
  const order = await prisma.order.findFirst({
    where: { id: orderId, userId },
    include: {
      items: true,
    },
  });

  if (!order) {
    return null;
  }

  return mapOrder(order);
};

