import { LoginRequired } from "@/features/auth/components/LoginRequired";
import { OrderDetail } from "@/features/orders/components/OrderDetail";
import { getOrderByIdService } from "@/features/orders/service/orders.service";
import { getSession } from "@/lib/auth-utils";
import { notFound } from "next/navigation";

interface OrderDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const session = await getSession();
  const { id } = await params;

  if (!session) {
    return (
      <LoginRequired
        message="Necesitas iniciar sesión para ver el detalle de tu pedido."
        returnTo={`/orders/${id}`}
      />
    );
  }

  const order = await getOrderByIdService(id, session.user.id);

  if (!order) {
    notFound();
  }

  return <OrderDetail order={order} />;
}
