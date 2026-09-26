import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";

export const EmptyOrders = () => {

  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-white px-6 py-16 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-slate-100">
        <FiShoppingBag className="size-6 text-slate-500" />
      </div>

      <h2 className="text-lg font-semibold text-slate-950">
        Aún no tienes compras
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        Cuando realices tu primera compra, aparecerá aquí tu historial de pedidos.
      </p>

      <Link
        href="/products"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Ir a la tienda
      </Link>
    </div>
  );
};