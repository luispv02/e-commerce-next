import Link from "next/link";

import { FiShoppingBag, FiSearch, FiArrowLeft } from "react-icons/fi";

export default function ProductNotFound() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] justify-center px-5 pt-16">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">

        <div className="mb-8 flex size-20 items-center justify-center rounded-full bg-slate-100">
          <FiShoppingBag
            className="size-9 text-slate-400"
            strokeWidth={1.5}
          />
        </div>

        <span className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Producto no encontrado
        </span>

        <h1 className="max-w-xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Este producto ya no está disponible
        </h1>

        <p className="mt-4 max-w-lg text-base leading-7 text-slate-500 sm:text-lg">
          El producto que estás buscando no existe, fue eliminado o
          actualmente no está disponible en nuestra tienda.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/products"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            <FiSearch className="size-4" />

            Explorar productos
          </Link>

          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <FiArrowLeft className="size-4" />

            Volver al inicio
          </Link>
        </div>

      </div>
    </main>
  );
}