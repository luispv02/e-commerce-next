import { OrderDetailView } from "@/features/admin/orders/components/OrderDetailView";
import { getAdminOrderById } from "@/features/admin/orders/services/order.service";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminOrderDetailPage({ params }: ProductPageProps) {
  const { id } = await params;

  const order = await getAdminOrderById(id);

  if (!order) notFound();

  return <OrderDetailView order={order} />;
}
