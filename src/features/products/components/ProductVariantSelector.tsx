import clsx from "clsx";
import { FiDroplet, FiMaximize2 } from "react-icons/fi";

import type { ClothesProduct, ProductVariant } from "../types/product";
import { getProductFilterLabel, getProductFilterOption } from "@/lib/product-filters";

interface ProductVariantSelectorProps {
  product: ClothesProduct;
  value: ProductVariant;
  onChange: (variants: ProductVariant) => void;
}

export const ProductVariantSelector = ({ product, value, onChange }: ProductVariantSelectorProps) => {
  const hasSizes = product.sizes.length > 0;
  const hasColors = product.colors.length > 0;

  if (!hasSizes && !hasColors) {
    return null;
  }

  return (
    <div className="space-y-8">
      {hasSizes && (
        <section className="grid grid-cols-[44px_1fr] gap-4">
          <div className="flex size-11 items-center justify-center rounded-full bg-slate-100 text-slate-600">
            <FiMaximize2 className="size-5" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-950">Tallas</h3>
            <p className="mt-1 text-sm text-slate-600">Selecciona una talla</p>

            <div className="mt-3 flex flex-wrap gap-3">
              {product.sizes.map((size) => {
                const isSelected = value.size === size;

                return (
                  <button
                    key={size}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => onChange({ ...value, size })}
                    className={clsx("inline-flex h-10 min-w-12 items-center justify-center rounded-lg border px-4 text-sm font-semibold transition cursor-pointer", isSelected
                      ? "border-slate-950 bg-slate-950 text-white"
                      : "border-slate-200 bg-white text-slate-900 hover:border-slate-400",
                    )}
                  >
                    {getProductFilterLabel(product.category, "sizes", size)}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {hasColors && (
        <section className="grid grid-cols-[44px_1fr] gap-4">
          <div className="flex size-11 items-center justify-center rounded-full bg-slate-100 text-slate-600">
            <FiDroplet className="size-5" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-950">Colores</h3>
            <p className="mt-1 text-sm text-slate-600">Selecciona un color</p>

            <div className="mt-3 flex flex-wrap gap-3">
              {product.colors.map((color) => {
                const isSelected = value.color === color;
                const colorOption = getProductFilterOption(product.category, "colors", color);

                return (
                  <button
                    key={color}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => onChange({ ...value, color })}
                    className={clsx("inline-flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-semibold transition cursor-pointer", isSelected
                      ? "border-slate-950 bg-slate-950 text-white"
                      : "border-slate-200 bg-white text-slate-900 hover:border-slate-400",
                    )}
                  >
                    <span
                      className={clsx("size-5 rounded-full border", color === "white" ? "border-slate-200" : "border-white/40")}
                      style={{ backgroundColor: colorOption?.hex ?? "#e2e8f0" }}
                      aria-hidden="true"
                    />
                    {colorOption?.label ?? color}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
