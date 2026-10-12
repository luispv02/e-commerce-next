import Link from "next/link";

export default function OrderNotFound() {
  return (
    <section className="flex min-h-[40vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-slate-950">Pedido no encontrado</h1>
      <p className="mt-2 max-w-sm text-sm text-slate-500">
        Este pedido no existe.
      </p>
      <Link
        href="/orders"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white"
      >
        Volver a mis compras
      </Link>
    </section>
  );
}
