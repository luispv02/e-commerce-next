import { Prisma } from "../../../../../generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { getPagination } from "@/lib/get-product-pagination";
import type { AdminOrderDetail, AdminOrderFilters, AdminOrderListItem, AdminOrderList } from "../types/orders";

const listSelect = {
  id: true,
  total: true,
  status: true,
  createdAt: true,
  user: {
    select: {
      name: true,
      email: true
    }
  },
  _count: {
    select: {
      items: true
    }
  },
} satisfies Prisma.OrderSelect;

const mapListOrder = (order: Prisma.OrderGetPayload<{ select: typeof listSelect }>): AdminOrderListItem => ({
  id: order.id,
  customerName: order.user.name,
  customerEmail: order.user.email,
  createdAt: order.createdAt,
  total: Number(order.total),
  status: order.status,
  itemCount: order._count.items,
});

export const getAdminOrders = async (filters: AdminOrderFilters): Promise<AdminOrderList> => {
  const where = {
    ...(filters.status ? { status: filters.status } : {})
  }

  const { page, limit, skip } = getPagination({ page: filters.page });

  const [orders, totalOrders, allOrders, pendingOrders, paidOrders, cancelledOrders] = await Promise.all([
    prisma.order.findMany({ where, select: listSelect, orderBy: { createdAt: "desc" }, skip, take: limit }),
    prisma.order.count({ where }),
    prisma.order.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.count({ where: { status: "PAID" } }),
    prisma.order.count({ where: { status: "CANCELLED" } }),
  ]);

  return {
    orders: orders.map(mapListOrder),
    pagination: {
      page,
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit)
    },
    allOrders,
    statusCounts: {
      PENDING: pendingOrders,
      PAID: paidOrders,
      CANCELLED: cancelledOrders
    },
  };
};

export const getAdminOrderById = async (id: string): Promise<AdminOrderDetail | null> => {

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      },
      items: true
    },
  });

  if (!order) return null;

  return {
    id: order.id,
    customerName: order.user.name,
    customerEmail: order.user.email,
    createdAt: order.createdAt,
    paidAt: order.paidAt,
    total: Number(order.total),
    status: order.status,
    itemCount: order.items.length,
    shippingAddress: order.shippingAddress as AdminOrderDetail["shippingAddress"],
    items: order.items.map((item) => ({
      id: item.id,
      title: item.title,
      quantity: item.quantity,
      pricePaid: Number(item.pricePaid),
      images: item.images as Array<{ url: string }>,
      variants: item.variants as AdminOrderDetail["items"][number]["variants"],
    })),
  };
};
