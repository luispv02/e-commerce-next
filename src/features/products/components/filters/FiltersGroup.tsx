"use client";

import clsx from "clsx";
import type { ProductFilterConfig } from "../../types/filters";
import { useFilterUpdater } from "../../hooks/useFilterUpdater";

interface FiltersGroupProps {
  filter: ProductFilterConfig;
  mode?: "desktop" | "mobile";
  draftParams?: URLSearchParams;
  onDraftChange?: (params: URLSearchParams) => void;
}

export const FiltersGroup = ({ filter, mode = "desktop", draftParams, onDraftChange }: FiltersGroupProps) => {

  const { params, updateParams } = useFilterUpdater({ mode, draftParams, onDraftChange });

  const currentValues = params.get(filter.filterKey)?.split(",") ?? [];

  const handleToggle = (optionId: string) => {
    const newParams = new URLSearchParams(params.toString());
    const isSelected = currentValues.includes(optionId);

    if (filter.multiple) {
      const newValues = isSelected
        ? currentValues.filter((id) => id !== optionId)
        : [...currentValues, optionId];

      if (newValues.length > 0) {
        newParams.set(filter.filterKey, newValues.join(","));
      } else {
        newParams.delete(filter.filterKey);
      }
    } else {
      if (isSelected) {
        newParams.delete(filter.filterKey);
      } else {
        newParams.set(filter.filterKey, optionId);
      }
    }

    newParams.set("page", "1")
    updateParams(newParams);
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