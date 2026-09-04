import { FiShoppingBag } from "react-icons/fi";

export const ProductActions = () => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        className="cursor-pointer inline-flex w-full h-14 items-center justify-center gap-3 rounded-xl bg-slate-950 px-6 text-base font-bold text-white shadow-sm transition hover:bg-slate-800"
      >
        <FiShoppingBag className="size-5" />
        Agregar al carrito
      </button>
    </div>
  );
};
