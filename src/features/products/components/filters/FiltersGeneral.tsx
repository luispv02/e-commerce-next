"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useFilterUpdater } from "../../hooks/useFilterUpdater";

interface FiltersGeneralProps {
  mode?: "desktop" | "mobile";
  draftParams?: URLSearchParams;
  onDraftChange?: (params: URLSearchParams) => void;
}

export const FiltersGeneral = ({ mode = "desktop", draftParams, onDraftChange }: FiltersGeneralProps) => {
  const { params, updateParams } = useFilterUpdater({ mode, draftParams, onDraftChange });

  const currentPrice = params.get("price") ?? "";
  const [min = "", max = ""] = currentPrice.split("-");

  const applyPrice = (minValue: string, maxValue: string) => {
    const newParams = new URLSearchParams(params.toString());

    if (minValue || maxValue) {
      newParams.set("price", `${minValue}-${maxValue}`);
    } else {
      newParams.delete("price");
    }

    newParams.set("page", "1");
    updateParams(newParams);
  };

  const getFormValues = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    return {
      min: String(formData.get("minPrice") ?? ""),
      max: String(formData.get("maxPrice") ?? ""),
    };
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (mode !== "mobile") return;

    const form = event.currentTarget.form;
    if (!form) return;

    const { min, max } = getFormValues(form);
    applyPrice(min, max);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (mode === "mobile") return;

    const { min, max } = getFormValues(event.currentTarget);
    applyPrice(min, max);
  };

  return (
    <form key={mode === "desktop" ? currentPrice : undefined} onSubmit={handleSubmit} className="mt-6 border-t border-slate-100 pt-6">
      <h3 className="text-sm font-semibold text-slate-950">
        Rango de precio
      </h3>

      <div className="mt-4 flex items-center gap-2">
        <input
          type="number"
          name="minPrice"
          placeholder="Min"
          min="0"
          inputMode="numeric"
          defaultValue={min}
          onChange={handlePriceChange}
          className="h-9 w-full rounded-md border border-slate-200 px-3 text-sm outline-none"
        />

        <span className="text-slate-400">-</span>

        <input
          type="number"
          name="maxPrice"
          placeholder="Max"
          min="0"
          inputMode="numeric"
          defaultValue={max}
          onChange={handlePriceChange}
          className="h-9 w-full rounded-md border border-slate-200 px-3 text-sm outline-none"
        />
      </div>

      <button type="submit" className="sr-only">
        Aplicar rango de precio
      </button>
    </form>
  )
}
