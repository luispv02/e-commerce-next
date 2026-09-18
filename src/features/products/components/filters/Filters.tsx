import { getCategoryFilters } from "@/lib/product-filter-config";
import { ProductsCategory } from "../../../../types/product";
import { CategoryFilters } from "./CategoryFilters";
import { FiltersGeneral } from "./FiltersGeneral";
import { FiltersGroup } from "./FiltersGroup";

interface FiltersProps {
  category: ProductsCategory;
  mode?: "desktop" | "mobile";
  draftParams?: URLSearchParams;
  onDraftChange?: (params: URLSearchParams) => void;
};

export const Filters = ({ category, mode = "desktop", draftParams, onDraftChange, }: FiltersProps) => {

  const categoryParam = draftParams?.get("category");

  const currentCategory = mode === "mobile" ? (categoryParam as ProductsCategory) : category;
  const categoryFilters = getCategoryFilters(currentCategory);

  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="hidden md:flex items-center justify-between border-b border-slate-100 pb-6">
        <h2 className="text-base font-semibold text-slate-950">
          Filtros
        </h2>
      </div>

      <CategoryFilters
        activeCategory={currentCategory}
        mode={mode}
        draftParams={draftParams}
        onDraftChange={onDraftChange}
      />

      <FiltersGeneral
        mode={mode}
        draftParams={draftParams}
        onDraftChange={onDraftChange}
      />

      <div className="mt-6 space-y-6">
        {categoryFilters.map((filter) => (
          <FiltersGroup
            key={filter.filterKey}
            filter={filter}
            mode={mode}
            draftParams={draftParams}
            onDraftChange={onDraftChange}
          />
        ))}
      </div>
    </aside>
  )
}