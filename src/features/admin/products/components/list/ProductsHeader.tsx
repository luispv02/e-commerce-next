import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export const ProductsHeader = () => {

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
          Productos
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Gestiona tus productos, agrega, edita o elimina.
        </p>
      </div>

      <Link
        href={'/admin/products/new'}
        type="button"
        className="cursor-pointer inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        <FaPlus className="size-3" />
        Agregar producto
      </Link>
    </div>
  );
};
