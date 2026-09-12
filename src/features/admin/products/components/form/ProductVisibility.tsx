"use client";

import { Controller, useFormContext } from "react-hook-form";
import { FiBarChart2, FiInfo, FiStar, FiUsers } from "react-icons/fi";
import type { ProductFormValues } from "../../schemas/product-form";
import { FormSection } from "./FormSection";
import { FormToggle } from "./FormToggle";
import { FieldError } from "./FieldError";

export const ProductVisibility = () => {

  const { control, setValue, formState: { errors } } = useFormContext<ProductFormValues>();

  return (
    <FormSection
      icon={<FiBarChart2 className="size-4" />}
      title="Visibilidad y promoción"
      subtitle="Controla la visibilidad y promoción del producto en la tienda."
      iconClassName="bg-emerald-50 text-emerald-600"
    >
      <div className="space-y-4">
        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <FiUsers className="mt-0.5 size-4 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-950">Producto activo</p>
                  <p className="text-xs text-slate-500">Visible en la tienda online.</p>
                </div>
              </div>
              <FormToggle
                checked={field.value}
                onChange={(checked) => {
                  field.onChange(checked);
                  if (!checked) {
                    setValue("isFeatured", false);
                  }
                }}
              />
            </div>
          )}
        />

        <Controller
          name="isFeatured"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <FiStar className="mt-0.5 size-4 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-950">Producto destacado</p>
                  <p className="text-xs text-slate-500">Mostrar en la sección destacada del inicio.</p>
                </div>
              </div>
              <FormToggle
                checked={field.value}
                onChange={(checked) => {
                  field.onChange(checked);
                  if (checked) {
                    setValue("isActive", true);
                  }
                }}
              />
            </div>
          )}
        />

        <FieldError message={errors.isFeatured?.message} />

        <div className="flex gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3 py-3 text-xs leading-5 text-blue-800">
          <FiInfo className="mt-0.5 size-4 shrink-0" />
          <p>
            Los productos destacados aparecerán en la sección de productos destacados en la página
            de inicio. Un producto debe estar activo para poder ser destacado.
          </p>
        </div>
      </div>
    </FormSection>
  );
};
