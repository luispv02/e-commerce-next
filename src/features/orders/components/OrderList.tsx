import type { Order } from "../types/orders";
import { OrderCard } from "./OrderCard";

interface OrderListProps {
  orders: Order[];
}

export const OrderList = ({ orders }: OrderListProps) => {
  return (
    <div className="space-y-4 md:space-y-5">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};
