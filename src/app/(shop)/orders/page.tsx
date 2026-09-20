import { LoginRequired } from "@/features/auth/components/LoginRequired";
import { OrderList } from "@/features/orders/components/OrderList";
import { orders } from "@/features/orders/data/orders";
import { getSession } from "@/lib/auth-utils";

export default async function OrdersPage() {
  const session = await getSession();

  if (!session) {
    return (
      <LoginRequired
        message="Necesitas iniciar sesión para ver tus compras realizadas."
        returnTo="/orders"
      />
    );
  }

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
          Mis Compras
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 md:text-base">
          Aquí puedes ver el historial de tus pedidos y los productos que has comprado.
        </p>
      </div>

      <OrderList orders={orders} />
    </section>
  );
}
