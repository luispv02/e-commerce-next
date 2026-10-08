import clsx from "clsx";
import Link from "next/link";
import { FiArrowLeft, FiLoader, FiSave, FiTrash2 } from "react-icons/fi";
import { DeleteProductButton } from "../DeleteProductButton";

interface ProductFormHeaderProps {
  mode: "create" | "edit";
  isSubmitting: boolean;
  product?: {
    id: string;
    title: string;
  };
}

export const ProductFormHeader = ({ mode, isSubmitting, product }: ProductFormHeaderProps) => {
  const isEdit = mode === "edit";

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
          {isEdit ? "Editar producto" : "Crear producto"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {isEdit
            ? "Actualiza la información del producto y guarda los cambios."
            : "Completa la información del producto y guarda los cambios."
          }
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/admin/products"
          className={clsx("cursor-pointer inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50", isSubmitting && "pointer-events-none")}
        >
          <FiArrowLeft className="size-4" />
          Volver a productos
        </Link>

        {isEdit && product && (
          <DeleteProductButton
            productId={product.id}
            productTitle={product.title}
            disabled={isSubmitting}
            className="cursor-pointer inline-flex h-10 items-center gap-2 rounded-lg border border-red-200 bg-white px-3 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiTrash2 className="size-4" />
            Eliminar
          </DeleteProductButton>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer inline-flex h-10 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (<FiLoader className="size-4 animate-spin" />) : (<FiSave className="size-4" />)}

          {isSubmitting
            ? isEdit
              ? "Guardando cambios..."
              : "Guardando producto..."
            : isEdit
              ? "Guardar cambios"
              : "Guardar producto"}
        </button>
      </div>
    </div>
  );
};
