import { FiEdit2, FiTrash2 } from "react-icons/fi";

export const ProductActions = () => {
  return (
    <div className="flex items- justify-end gap-2">
      <button
        type="button"
        aria-label="Editar producto"
        className="cursor-pointer inline-flex size-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
      >
        <FiEdit2 className="size-3.5" />
      </button>

      <button
        type="button"
        aria-label="Eliminar producto"
        className="cursor-pointer inline-flex size-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100"
      >
        <FiTrash2 className="size-3.5" />
      </button>
    </div>
  );
};
