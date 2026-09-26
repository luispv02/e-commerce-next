import { formatPrice } from "@/lib/format-price";
import { useRouter } from "next/navigation";
import { FiLock } from "react-icons/fi";

interface CartSummaryProps {
  itemCount: number;
  subtotal: number;
  hasInvalidItems: boolean;
}

export const CartSummary = ({ itemCount, subtotal, hasInvalidItems }: CartSummaryProps) => {

  const router = useRouter()

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6">
        <h2 className="text-lg font-bold text-slate-950">Resumen del pedido</h2>

        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-slate-500">Subtotal ({itemCount} productos)</dt>
            <dd className="font-medium text-slate-950">
              {formatPrice(subtotal)}
            </dd>
          </div>

          <div className="flex items-center justify-between gap-4">
            <dt className="inline-flex items-center gap-1.5 text-slate-500">
              Envío
            </dt>
            <dd className="font-medium text-emerald-600">Gratis</dd>
          </div>
        </dl>

        <div className="mt-5 border-t border-slate-200 pt-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-base font-bold text-slate-950 md:text-lg">Total</p>
              <p className="mt-0.5 text-xs text-slate-500">Impuestos incluidos</p>
            </div>

            <p className="text-xl font-bold tracking-tight text-slate-950 md:text-2xl">
              {formatPrice(subtotal)}
            </p>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleCheckout}
              disabled={hasInvalidItems}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              <FiLock className="size-4" />
              Finalizar compra
            </button>

            {hasInvalidItems && (
              <p className="mt-3 text-center text-xs font-medium text-rose-600">
                Revisa los productos de tu carrito para continuar.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
