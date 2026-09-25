import { FiMinus, FiPlus } from "react-icons/fi";

interface QuantitySelectorProps {
  quantity: number;
  stockAvailable: number;
  isPending: boolean;
  onQuantityChange: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, stockAvailable, isPending, onQuantityChange, }: QuantitySelectorProps) => {

  return (
    <div className="inline-flex h-9 items-center overflow-hidden rounded-lg border border-slate-200 bg-white">
      <button
        type="button"
        aria-label="Disminuir cantidad"
        onClick={() => onQuantityChange(quantity - 1)}
        disabled={isPending || quantity <= 1}
        className="flex size-9 cursor-pointer items-center justify-center text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
      >
        <FiMinus className="size-3.5" />
      </button>

      <span className="min-w-8 text-center text-sm font-medium text-slate-800">
        {quantity}
      </span>

      <button
        type="button"
        aria-label="Aumentar cantidad"
        onClick={() => onQuantityChange(quantity + 1)}
        disabled={isPending || stockAvailable <= 0}
        className="flex size-9 cursor-pointer items-center justify-center text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
      >
        <FiPlus className="size-3.5" />
      </button>
    </div>
  );
};
