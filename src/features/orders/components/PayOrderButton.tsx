import { FiCreditCard } from "react-icons/fi";

export const PayOrderButton = () => {
  return (
    <button
      type="button"
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white sm:w-auto cursor-pointer"
    >
      <FiCreditCard className="size-4" />
      Pagar pedido
    </button>
  );
};
