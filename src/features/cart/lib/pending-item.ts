
import { ProductVariant } from "@/types/product";

const PENDING_CART_ITEM_KEY = "pending-cart-item";

export interface PendingCartItem {
  productId: string;
  quantity: number;
  variants?: ProductVariant;
}

export const savePendingCartItem = (item: PendingCartItem) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(PENDING_CART_ITEM_KEY, JSON.stringify(item));
};

export const getPendingCartItem = (): PendingCartItem | null => {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(PENDING_CART_ITEM_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const clearPendingCartItem = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(PENDING_CART_ITEM_KEY);
};