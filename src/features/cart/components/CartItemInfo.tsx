import { FiCheck } from "react-icons/fi";

interface CartItemInfoProps {
  title: string;
  color: string | null;
  size: string | null;
  inStock: boolean;
}

export const CartItemInfo = ({ title, color, size, inStock, }: CartItemInfoProps) => {
  return (
    <div className="min-w-0 flex-1">
      <h2 className="text-sm font-bold leading-5 text-slate-950 md:text-base md:leading-6">
        {title}
      </h2>

      {(color || size) && (
        <p className="mt-1 text-xs text-slate-500 md:text-sm">
          {color && `Color: ${color}`}
          {color && size && " | "}
          {size && `Talla: ${size}`}
        </p>
      )}

      {inStock && (
        <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
          <FiCheck className="size-3 stroke-[2.5]" />
          En stock
        </span>
      )}
    </div>
  )
}