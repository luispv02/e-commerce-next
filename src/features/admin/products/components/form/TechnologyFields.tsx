"use client";

import { technologyFilters } from "@/config/product-filters";
import { Controller, useFormContext } from "react-hook-form";
import { FiMonitor, FiTag } from "react-icons/fi";
import type { ProductFormValues } from "../../schemas/product-form";
import { FormSection } from "./FormSection";
import { FieldError } from "./FieldError";

const typeFilter = technologyFilters.find((filter) => filter.filterKey === "type");
const brandFilter = technologyFilters.find((filter) => filter.filterKey === "brand");

export const TechnologyFields = () => {
  const { control, formState: { errors } } = useFormContext<ProductFormValues>();

  return (
    <FormSection
      icon={<FiMonitor className="size-4" />}
      title="Información adicional – Tecnología"
      subtitle="Especifica las características del producto."
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="tech-type" className="mb-1.5 block text-sm font-medium text-slate-700">
            Tipo de producto
          </label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <FiTag className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <select
                  id="tech-type"
                  value={field.value}
                  onChange={field.onChange}
                  className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-9 pr-8 text-sm text-slate-950 outline-none transition focus:border-blue-500"
                >
                  <option value="">Selecciona un tipo</option>
                  {typeFilter?.options.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />
          <FieldError message={errors.type?.message} />
        </div>

        <div>
          <label htmlFor="brand" className="mb-1.5 block text-sm font-medium text-slate-700">
            Marca
          </label>
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <FiMonitor className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <select
                  id="brand"
                  value={field.value}
                  onChange={field.onChange}
                  className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-9 pr-8 text-sm text-slate-950 outline-none transition focus:border-blue-500"
                >
                  <option value="">Selecciona una marca</option>
                  {brandFilter?.options.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />
          <FieldError message={errors.brand?.message} />
        </div>
      </div>
    </FormSection>
  );
};
