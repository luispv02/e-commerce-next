import { prisma } from "@/lib/prisma";

import type { DashboardGroupBy, DashboardPeriod } from "../types/dashboard";
import { Prisma } from "../../../../../generated/prisma/client";
import { buildSalesTimeline, getDateRange, getGrouping } from "../lib/dashboard-helper";


const getOrdersSummary = async (startDate: Date, endDate: Date) => {
  const [orders, orderItems] = await Promise.all([
    prisma.order.aggregate({
      where: {
        createdAt: { gte: startDate, lte: endDate },
      },
      _sum: { total: true },
      _count: { id: true },
    }),

    prisma.orderItem.aggregate({
      where: {
        order: {
          createdAt: { gte: startDate, lte: endDate },
        },
      },
      _sum: { quantity: true },
    }),
  ]);

  return {
    totalRevenue: Number(orders._sum.total ?? 0),
    totalOrders: orders._count.id,
    unitsSold: orderItems._sum.quantity ?? 0,
  };
}

const getPreviousOrdersSummary = async (previousStartDate: Date, startDate: Date) => {
  const result = await prisma.order.aggregate({
    where: {
      createdAt: { gte: previousStartDate, lt: startDate },
    },
    _sum: { total: true },
  });

  return {
    totalRevenue: Number(result._sum.total ?? 0)
  };
}

const getSalesTimeline = async ({ startDate, endDate, groupBy }: { startDate: Date; endDate: Date; groupBy: DashboardGroupBy; }) => {
  let selectExpr: Prisma.Sql;
  let groupByExpr: Prisma.Sql;
  let orderByExpr: Prisma.Sql;

  if (groupBy === "day") {
    selectExpr = Prisma.sql`
      TO_CHAR(
        "createdAt",
        'YYYY-MM-DD'
      ) AS "id"
    `;

    groupByExpr = Prisma.sql`
      TO_CHAR(
        "createdAt",
        'YYYY-MM-DD'
      )
    `;

    orderByExpr = Prisma.sql`
      "id" ASC
    `;
  } else if (groupBy === "week") {
    selectExpr = Prisma.sql`
      EXTRACT(
        ISOYEAR FROM "createdAt"
      )::int AS year,
      
      EXTRACT(
        WEEK FROM "createdAt"
      )::int AS week
    `;

    groupByExpr = Prisma.sql`
      EXTRACT(
        ISOYEAR FROM "createdAt"
      ),

      EXTRACT(
        WEEK FROM "createdAt"
      )
    `;

    orderByExpr = Prisma.sql`
      year ASC,
      week ASC
    `;
  } else if (groupBy === "month") {
    selectExpr = Prisma.sql`
      EXTRACT(
        YEAR FROM "createdAt"
      )::int AS year,

      EXTRACT(
        MONTH FROM "createdAt"
      )::int AS month
    `;

    groupByExpr = Prisma.sql`
      EXTRACT(
        YEAR FROM "createdAt"
      ),

      EXTRACT(
        MONTH FROM "createdAt"
      )
    `;

    orderByExpr = Prisma.sql`
      year ASC,
      month ASC
    `;
  } else {
    throw new Error("groupBy inválido");
  }

  const rows = await prisma.$queryRaw<
    {
      id?: string;
      year?: number;
      week?: number;
      month?: number;
      revenue: number;
    }[]
  >`
    SELECT
      ${selectExpr},
      SUM(total)::float AS revenue
    FROM "Order"
    WHERE
      "createdAt" >= ${startDate}
      AND "createdAt" <= ${endDate}
    GROUP BY
      ${groupByExpr}
    ORDER BY
      ${orderByExpr}
  `;

  if (groupBy === "day") {
    return rows.map((row) => ({
      id: row.id!,
      revenue: Number(row.revenue),
    }));
  }

  if (groupBy === "week") {
    return rows.map((row) => ({
      id: {
        year: row.year!,
        week: row.week!,
      },
      revenue: Number(row.revenue),
    }));
  }

  return rows.map((row) => ({
    id: {
      year: row.year!,
      month: row.month!,
    },
    revenue: Number(row.revenue),
  }));
}

const getTopProducts = async (startDate: Date, endDate: Date) => {
  const rows = await prisma.$queryRaw<
    {
      id: string;
      name: string;
      units: number;
      revenue: number;
      image: string | null;
    }[]
  >`
      SELECT
        oi."productId" AS id,
        MAX(oi.title) AS name,
        SUM(
          oi.quantity
        )::int AS units,
        SUM(
          oi.quantity * oi."pricePaid"
        )::numeric AS revenue,
        MAX((
          SELECT pi.url
          FROM product_images pi
          WHERE
            pi."productId" =
              oi."productId"
          LIMIT 1
        )) AS image
      FROM "OrderItem" oi
      INNER JOIN "Order" o
        ON o.id = oi."orderId"
      WHERE
        o."createdAt" >= ${startDate}
        AND o."createdAt" <= ${endDate}
      GROUP BY
        oi."productId"
      ORDER BY
        units DESC,
        revenue DESC
      LIMIT 5
    `;

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    units: Number(row.units),
    revenue: Number(row.revenue),
    image: row.image ?? null,
  }));
}

const getRecentOrders = async (startDate: Date, endDate: Date) => {
  return prisma.order.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
}


const countNewUsers = (startDate: Date, endDate: Date) => {
  return prisma.user.count({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
      role: {
        not: "admin",
      },
    },
  });
}

export const getDashboardData = async (period: DashboardPeriod = "7d") => {
  
  const { endDate, previousStartDate, startDate } = getDateRange(period);

  const groupBy = getGrouping(period);

  const [summary, previousSummary, sales, topProducts, recentOrders, newUsers] = await Promise.all([
    getOrdersSummary(startDate, endDate),
    getPreviousOrdersSummary(previousStartDate, startDate),
    getSalesTimeline({ startDate, endDate, groupBy }),
    getTopProducts(startDate, endDate),
    getRecentOrders(startDate, endDate),
    countNewUsers(startDate, endDate),
  ]);

  const totalRevenue = summary?.totalRevenue ?? 0;
  const totalOrders = summary?.totalOrders ?? 0;
  const unitsSold = summary?.unitsSold ?? 0;
  const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const previousRevenue = previousSummary?.totalRevenue ?? 0;

  let growth: number | null = null;

  if (previousRevenue > 0) {
    growth = Number((((totalRevenue - previousRevenue) / previousRevenue) * 100).toFixed(1));
  } else if (totalRevenue === 0) {
    growth = 0;
  }

  return {
    summary: {
      totalRevenue,
      totalOrders,
      unitsSold,
      averageOrderValue,
      growth,
      newUsers,
    },
    sales: buildSalesTimeline(sales, startDate, endDate, groupBy),
    recentOrders: recentOrders.map((order) => ({
      id: order.id,
      customerEmail: order.user.email ?? null,
      customerName: order.user.name ?? null,
      date: order.createdAt,
      total: Number(order.total),
    })),
    topProducts: topProducts.map((product) => ({
      ...product,
      percentage: totalRevenue ? Number(((product.revenue / totalRevenue) * 100).toFixed(1)) : 0,
    })),
  };
}