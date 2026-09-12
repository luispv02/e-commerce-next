"use client";

import { clothesFilters } from "@/config/product-filters";
import clsx from "clsx";
import { Controller, useFormContext } from "react-hook-form";
import { FiTag, FiUser } from "react-icons/fi";
import { LuShirt } from "react-icons/lu";
import type { ProductFormValues } from "../../schemas/product-form";
import { FormSection } from "./FormSection";
import { FieldError } from "./FieldError";

const sizesFilter = clothesFilters.find((filter) => filter.filterKey === "sizes");
const genderFilter = clothesFilters.find((filter) => filter.filterKey === "gender");
const colorsFilter = clothesFilters.find((filter) => filter.filterKey === "colors");
const typeFilter = clothesFilters.find((filter) => filter.filterKey === "type");

export const ClothingFields = () => {

  const { control, formState: { errors } } = useFormContext<ProductFormValues>();

  return (
    <FormSection
      icon={<LuShirt className="size-4" />}
      title="Información adicional – Ropa"
      subtitle="Especifica las características del producto."
    >
      <div className="space-y-5">
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">Talla</p>
          <Controller
            name="sizes"
            control={control}
            render={({ field }) => (
              <div className="flex flex-wrap gap-2">
                {sizesFilter?.options.map((option) => {
                  const selected = field.value.includes(option.id);

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        field.onChange(selected
                          ? field.value.filter((value) => value !== option.id)
                          : [...field.value, option.id]
                        );
                      }}
                      className={clsx("h-9 min-w-11 rounded-lg border px-3 text-sm font-medium transition", selected
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300",
                      )}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            )}
          />
          <FieldError message={errors.sizes?.message} />
        </div>

        <div>
          <label htmlFor="gender" className="mb-1.5 block text-sm font-medium text-slate-700">
            Género
          </label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <FiUser className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <select
                  id="gender"
                  value={field.value}
                  onChange={field.onChange}
                  className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-9 pr-8 text-sm text-slate-950 outline-none transition focus:border-blue-500"
                >
                  <option value="">Selecciona un género</option>
                  {genderFilter?.options.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />
          <FieldError message={errors.gender?.message} />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">Color</p>
          <Controller
            name="colors"
            control={control}
            render={({ field }) => (
              <div className="flex flex-wrap gap-2">
                {colorsFilter?.options.map((option) => {
                  const selected = field.value.includes(option.id);

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        field.onChange(selected
                          ? field.value.filter((value) => value !== option.id)
                          : [...field.value, option.id],
                        );
                      }}
                      className={clsx("inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition", selected
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-white text-slate-700",
                      )}
                    >
                      <span
                        className="size-3.5 rounded-full border border-slate-200"
                        style={{ backgroundColor: option.hex }}
                      />
                      {option.label}
                    </button>
                  );
                })}
              </div>
            )}
          />
          <FieldError message={errors.colors?.message} />
        </div>

        <div>
          <label htmlFor="clothes-type" className="mb-1.5 block text-sm font-medium text-slate-700">
            Tipo
          </label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <FiTag className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <select
                  id="clothes-type"
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
      </div>
    </FormSection>
  );
};
