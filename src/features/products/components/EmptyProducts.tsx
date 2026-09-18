import { LuSearchX } from "react-icons/lu"


export const EmptyProducts = () => {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 px-6 text-center">
      <LuSearchX className="size-10 text-slate-400" />

      <h2 className="mt-4 text-lg font-semibold text-slate-900">
        No se encontraron productos.
      </h2>

      <p className="mt-2 max-w-md text-sm text-slate-500">
        No hay productos que coincidan con los filtros seleccionados.
        Intenta cambiar o quitar algunos filtros.
      </p>
    </div>
  )
}