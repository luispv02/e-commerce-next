"use client";


import { FiClock } from "react-icons/fi";
import { FormSection } from "./FormSection";
import { dateFormatter } from "@/lib/format-date";

interface ProductMetadataProps {
  productId: string;
  createdAt?: string;
  updatedAt?: string;
}

export const ProductMetadata = ({ productId, createdAt, updatedAt, }: ProductMetadataProps) => {
  console.log('createdAt', createdAt)

  return (
    <FormSection
      icon={<FiClock className="size-4" />}
      title="Información adicional"
    >
      <dl className="space-y-3 text-sm">
        <div className="flex items-start justify-between gap-3">
          <dt className="text-slate-500">ID del producto</dt>
          <dd className="flex min-w-0 items-center gap-2 text-right font-medium text-slate-700">
            <span>{productId}</span>

          </dd>
        </div>

        <div className="flex items-center justify-between gap-3">
          <dt className="text-slate-500">Creado el</dt>
          <dd className="text-slate-700">{dateFormatter(createdAt)}</dd>
        </div>

        <div className="flex items-center justify-between gap-3">
          <dt className="text-slate-500">Última actualización</dt>
          <dd className="text-slate-700">{dateFormatter(updatedAt)}</dd>
        </div>
      </dl>
    </FormSection>
  );
};
