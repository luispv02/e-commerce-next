
import Link from "next/link";
import { FiArrowLeft, FiFileText } from "react-icons/fi";

export default function OrderNotFound() {
  return (
    <section className="flex min-h-[calc(100dvh-8rem)] items-center justify-center px-4 py-8 sm:px-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white px-5 py-10 text-center shadow-sm sm:px-10">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-slate-100">
          <FiFileText className="size-8 text-slate-500" strokeWidth={1.5} />
        </div>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Pedido no encontrado
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
          La orden que buscas no existe, fue eliminada o ya no está disponible.
        </p>

        <Link
          href="/admin/orders"
          className="mt-8 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950 sm:w-auto"
        >
          <FiArrowLeft className="size-4" />
          Volver a pedidos
        </Link>
      </div>
    </section>
  );
}
