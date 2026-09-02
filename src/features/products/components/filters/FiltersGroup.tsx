"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Filter } from "../../types/filters";

interface FiltersGroupProps {
  filter: Filter;
}

export const FiltersGroup = ({ filter }: FiltersGroupProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentValues = searchParams.get(filter.filterKey)?.split(",") ?? [];

  const handleToggle = (optionId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const isSelected = currentValues.includes(optionId);

    if (filter.multiple) {
      const newValues = isSelected
        ? currentValues.filter((id) => id !== optionId)
        : [...currentValues, optionId];

      if (newValues.length > 0) {
        params.set(filter.filterKey, newValues.join(","));
      } else {
        params.delete(filter.filterKey);
      }
    } else {
      if (isSelected) {
        params.delete(filter.filterKey);
      } else {
        params.set(filter.filterKey, optionId);
      }
    }

    params.set("page", "1")
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-950">
        {filter.title}
      </h3>

      <div className="mt-3 flex flex-wrap gap-2">
        {filter.options.map((option) => {
          const isActive = currentValues.includes(option.id);

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleToggle(option.id)}
              className={clsx("rounded-lg border px-3 py-2 text-sm transition cursor-pointer", isActive
                ? "border-blue-600 bg-blue-50 text-blue-600"
                : "border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-950"
              )}
            >
              {option.hex && (
                <span
                  className="mr-2 inline-block size-3 rounded-full border border-slate-200"
                  style={{ backgroundColor: option.hex }}
                />
              )}

              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};