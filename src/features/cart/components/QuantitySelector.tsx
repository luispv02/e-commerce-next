import { FiMinus, FiPlus } from "react-icons/fi";

interface QuantitySelectorProps {
  quantity: number;
}

export const QuantitySelector = ({ quantity }: QuantitySelectorProps) => {
  return (
    <div className="inline-flex h-9 items-center overflow-hidden rounded-lg border border-slate-200 bg-white">
      <button
        type="button"
        aria-label="Disminuir cantidad"
        className="flex size-9 items-center justify-center  text-slate-500 transition hover:bg-slate-100 cursor-pointer"
      >
        <FiMinus className="size-3.5" />
      </button>

      <span className="min-w-8 text-center text-sm font-medium text-slate-950">
        {quantity}
      </span>

      <button
        type="button"
        aria-label="Aumentar cantidad"
        className="flex size-9 items-center justify-center text-slate-500 transition hover:bg-slate-100 cursor-pointer"
      >
        <FiPlus className="size-3.5" />
      </button>
    </div>
  );
};
