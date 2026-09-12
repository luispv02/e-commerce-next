import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { LuPackageSearch } from "react-icons/lu";

export default function ProductNotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-gray-100">
          <LuPackageSearch className="size-8 text-gray-500" />
        </div>

        <h1 className="text-2xl font-semibold text-gray-900">
          Producto no encontrado
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          El producto que intentas editar no existe o ya fue eliminado.
        </p>

        <Link
          href="/admin/products"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <BsArrowLeft className="size-4" />
          Volver a productos
        </Link>
      </div>
    </main>
  );
}