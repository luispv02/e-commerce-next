import type { OrderStatus } from "@/features/orders/types/orders";

export interface AdminOrderFilters {
  page: number;
  status?: OrderStatus;
}

export interface AdminOrderListItem {
  id: string;
  customerName: string;
  customerEmail: string;
  createdAt: Date;
  total: number;
  status: OrderStatus;
  itemCount: number;
}

export interface AdminOrderDetail extends AdminOrderListItem {
  paidAt: Date | null;
  shippingAddress: {
    fullName: string;
    phone: string;
    street: string;
    neighborhood: string;
    postalCode: string;
    city: string;
    state: string;
    references?: string;
  };
  items: Array<{
    id: string;
    title: string;
    quantity: number;
    pricePaid: number;
    images: Array<{ url: string }>;
    variants?: { size?: string; color?: string };
  }>;
}

export interface AdminOrderList {
  orders: AdminOrderListItem[];
  pagination: {
    page: number;
    totalOrders: number;
    totalPages: number;
  };
  allOrders: number;
  statusCounts: Record<OrderStatus, number>;
}
