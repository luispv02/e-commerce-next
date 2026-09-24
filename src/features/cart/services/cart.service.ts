

import type { ProductVariant } from "@/types/product";
import type { AddCartItem, Cart, CartActionResponse } from "../types/cart";
import { prisma } from "@/lib/prisma";
import { CustomError } from "@/lib/custom-error";
import { mapProduct } from "@/features/products/mappers/product.mapper";
import { sameVariants } from "../lib/variants";

export const addCartItemService = async (userId: string, data: AddCartItem): Promise<CartActionResponse> => {
  const { productId, quantity, variants } = data;

  if (quantity < 1) {
    return {
      success: false,
      message: "Cantidad inválida.",
    };
  }

  try {

    await prisma.$transaction(async (tx) => {

      // Find the active product
      const product = await tx.product.findFirst({
        where: {
          id: productId,
          isActive: true,
        },
      });

      if (!product) {
        throw new CustomError("Producto no encontrado.", 404);
      }

      // Get the user cart or create it if it does not exist
      const cart = await tx.cart.upsert({
        where: { userId },
        update: {},
        create: { userId },
        include: {
          items: {
            where: { productId }
          }
        },
      });

      // Find an existing item with the same product and variants
      const existingItem = cart.items.find((item) => sameVariants(item.variants as ProductVariant | null, variants));

      // Calculate the total quantity of this product already in the cart
      const totalQuantitySameProduct = cart.items.reduce((total, item) => total + item.quantity, 0);

      const newTotalQuantity = totalQuantitySameProduct + quantity;

      // Validate the total stock available for the product
      if (newTotalQuantity > product.stock) {
        throw new CustomError("Stock insuficiente.", 400);
      }

      // If the same product and variants already exist, increase the existing items quantity.
      if (existingItem) {
        await tx.cartItem.update({
          where: {
            id: existingItem.id,
          },
          data: {
            quantity: existingItem.quantity + quantity,
          },
        });

        return;
      }

      // Create a new cart item when the product/variant combination does not already exist in the cart.
      await tx.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          variants: variants ? { size: variants.size, color: variants.color, } : undefined,
        },
      });
    });

    return {
      success: true,
      message: "Producto agregado al carrito.",
    };

  } catch (error) {
    if (error instanceof CustomError) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "No se pudo agregar el producto al carrito.",
    };
  }
};

export const getCartService = async (userId: string,): Promise<Cart | null> => {

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        orderBy: {
          createdAt: "desc",
        },
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

  if (!cart) {
    return null;
  }

  const productQuantities: Record<string, number> = {};

  for (const item of cart.items) {
    const currentQuantity = productQuantities[item.productId] ?? 0;

    productQuantities[item.productId] = currentQuantity + item.quantity;
  }

  return {
    id: cart.id,
    userId: cart.userId,
    createdAt: cart.createdAt.toISOString(),
    updatedAt: cart.updatedAt.toISOString(),
    items: cart.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      variants: item.variants as ProductVariant | undefined,
      stockAvailable: item.product.stock - (productQuantities[item.productId] ?? 0),
      product: mapProduct(item.product),
    })),
  };
};

export const getCartItemCountService = async (userId: string): Promise<number> => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        select: { quantity: true },
      },
    },
  });

  if (!cart) return 0;

  return cart.items.reduce((total, item) => total + item.quantity, 0);
};

export const removeCartItemService = async (userId: string, cartItemId: string): Promise<CartActionResponse> => {
  try {

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        cart: { userId },
      },
    });

    if (!cartItem) {
      throw new CustomError("Producto no encontrado en el carrito.", 404);
    }

    await prisma.cartItem.delete({
      where: {
        id: cartItem.id,
      },
    });

    return {
      success: true,
      message: "Producto eliminado del carrito.",
    };

  } catch (error) {

    if (error instanceof CustomError) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "No se pudo eliminar el producto del carrito.",
    };
  }
}