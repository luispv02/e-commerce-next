"use client";

import { productCategories } from "@/features/products/config/categories";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { FiBox, FiFileText, FiTag } from "react-icons/fi";
import type { ProductFormValues } from "../../schemas/product-form";
import { FormSection } from "./FormSection";
import { FieldError } from "./FieldError";

interface ProductGeneralInfoProps {
  categoryLocked: boolean;
}

const categories = productCategories.filter((category) => category.id !== "all");

export const ProductGeneralInfo = ({ categoryLocked }: ProductGeneralInfoProps) => {

  const { clearErrors, register, setValue, watch, formState: { errors }, } = useFormContext<ProductFormValues>();

  const handleCategoryChange = (value: ProductFormValues["category"]) => {
    setValue("category", value, { shouldDirty: true });
    clearErrors("category");
  };

  return (
    <FormSection icon={<FiFileText className="size-4" />} title="Información general" subtitle="Datos básicos del producto." >
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-slate-700">
            Título del producto
          </label>
          <input
            id="title"
            {...register("title")}
            className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-950 outline-none transition focus:border-blue-500"
          />
          <FieldError message={errors.title?.message} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="price" className="mb-1.5 block text-sm font-medium text-slate-700">
              Precio
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                $
              </span>
              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                {...register("price")}
                className="h-11 w-full rounded-lg border border-slate-200 pl-7 pr-3 text-sm text-slate-950 outline-none transition focus:border-blue-500"
              />
            </div>
            <FieldError message={errors.price?.message} />
          </div>

          <div>
            <label htmlFor="stock" className="mb-1.5 block text-sm font-medium text-slate-700">
              Stock
            </label>
            <div className="relative">
              <FiBox className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                id="stock"
                type="number"
                min="0"
                step="1"
                {...register("stock")}
                className="h-11 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm text-slate-950 outline-none transition focus:border-blue-500"
              />
            </div>
            <FieldError message={errors.stock?.message} />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-slate-700">
            Descripción
          </label>
          <textarea
            id="description"
            rows={5}
            {...register("description")}
            className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-950 outline-none transition focus:border-blue-500"
          />
          <FieldError message={errors.description?.message} />
        </div>

        <div>
          <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-slate-700">
            Categoría
          </label>
          <div className="relative">
            <FiTag className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <select
              id="category"
              disabled={categoryLocked}
              value={watch("category")}
              onChange={(event) =>
                handleCategoryChange(event.target.value as ProductFormValues["category"])
              }
              className={clsx(
                "h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-9 pr-8 text-sm text-slate-950 outline-none transition focus:border-blue-500",
                categoryLocked && "cursor-not-allowed bg-slate-50 text-slate-500 opacity-60",
              )}
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <p className="mt-1.5 text-xs text-slate-500">
            Selecciona la categoría principal del producto.
          </p>
          <FieldError message={errors.category?.message} />
        </div>
      </div>
    </FormSection>
  );
};
