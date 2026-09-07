
import { formatPrice } from "@/lib/format-price";
import { PaymentSection } from "./PaymentSection";

interface OrderSummaryProps {
  itemCount: number;
  subtotal: number;
}

export const OrderSummary = ({ itemCount, subtotal }: OrderSummaryProps) => {

  return (
    <aside className="overflow-hidden rounded-lg border border-[#c5d3e6] bg-white lg:sticky lg:top-24">
      <div className="p-5 md:p-6">
        <h2 className="text-xl font-bold tracking-tight text-slate-950">
          Resumen del pedido
        </h2>

        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-[#29477b]">Productos ({itemCount})</dt>
            <dd className="font-medium text-slate-950">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-[#29477b]">Envío</dt>
            <dd className="font-medium text-emerald-600">Gratis</dd>
          </div>
        </dl>

        <div className="mt-5 border-t border-[#d9e3f0] pt-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xl font-bold text-slate-950">Total</p>
              <p className="mt-1 text-xs text-[#38558a]">Impuestos incluidos</p>
            </div>
            <p className="text-2xl font-bold tracking-tight text-slate-950">
              {formatPrice(subtotal)}
            </p>
          </div>

          <PaymentSection />
        </div>
      </div>
    </aside>
  );
};
