import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

export const EmptyCart = () => {
  return (
    <section className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center text-center">
      <div className="inline-flex size-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <FiShoppingCart className="size-7" />
      </div>

      <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-950">
        Tu carrito está vacío
      </h1>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        Explora la tienda y agrega productos para verlos aquí.
      </p>

      <Link
        href="/products"
        className="mt-8 inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-slate-50"
      >
        Seguir comprando
      </Link>
    </section>
  );
};
