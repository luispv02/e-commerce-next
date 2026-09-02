"use client";

import type { FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const FiltersGeneral = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPrice = searchParams.get("price") ?? "";
  const [min = "", max = ""] = currentPrice.split("-");
  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const min = String(formData.get("minPrice") ?? "");
    const max = String(formData.get("maxPrice") ?? "");

    const params = new URLSearchParams(searchParams.toString());

    if (min || max) {
      params.set("price", `${min}-${max}`);
    } else {
      params.delete("price");
    }

    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form key={currentPrice} onSubmit={handleSubmit} className="mt-6 border-t border-slate-100 pt-6">
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
          className="h-9 w-full rounded-md border border-slate-200 px-3 text-sm outline-none"
        />
      </div>

      <button type="submit" className="sr-only">
        Aplicar rango de precio
      </button>
    </form>
  )
}
