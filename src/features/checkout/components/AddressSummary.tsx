import { FiEdit2, FiMapPin } from "react-icons/fi";

import type { ShippingAddressFormData } from "../schemas/address";

interface AddressSummaryProps {
  address: ShippingAddressFormData;
  onEdit: () => void;
}

export const AddressSummary = ({ address, onEdit }: AddressSummaryProps) => {

  return (
    <section className="rounded-lg border border-[#c5d3e6] bg-white">
      <div className="flex gap-4 p-5 md:p-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
          <FiMapPin className="size-6" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-950">
                Dirección de envío
              </h2>
            </div>

            <button
              type="button"
              onClick={onEdit}
              className="inline-flex h-9 w-fit items-center justify-center gap-2 rounded-md border border-blue-300 px-4 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 cursor-pointer"
            >
              <FiEdit2 className="size-4" />
              Editar
            </button>
          </div>

          <address className="not-italic text-sm leading-[1.6] text-[#29477b]">
            <strong className="block font-semibold text-slate-950">
              {address.fullName}
            </strong>

            <span className="block">{address.phone}</span>

            <span className="block">{address.street}</span>

            <span className="block">
              {address.neighborhood}, {address.postalCode}
            </span>

            <span className="block">
              {address.city}, {address.state}
            </span>

            <span className="block">México</span>

            {address.references && (
              <span className="mt-2 block">
                <strong className="font-medium text-slate-950">
                  Referencias:
                </strong>{" "}
                {address.references}
              </span>
            )}
          </address>
        </div>
      </div>
    </section>
  );
};