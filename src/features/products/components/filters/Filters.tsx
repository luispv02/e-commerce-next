import { getCategoryFilters } from "../../config/filters";
import { ProductCategory } from "../../types/product";
import { CategoryFilters } from "./CategoryFilters";
import { FiltersGeneral } from "./FiltersGeneral";
import { FiltersGroup } from "./FiltersGroup";

interface FiltersProps {
  category: ProductCategory;
};

export const Filters = ({ category }: FiltersProps) => {
  const categoryFilters = getCategoryFilters(category);

  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="hidden md:flex items-center justify-between border-b border-slate-100 pb-6">
        <h2 className="text-base font-semibold text-slate-950">
          Filtros
        </h2>
      </div>

      <CategoryFilters activeCategory={category} />

      <FiltersGeneral />

      <div className="mt-6 space-y-6">
        {categoryFilters.map((filter) => (
          <FiltersGroup
            key={filter.filterKey}
            filter={filter}
          />
        ))}
      </div>
    </aside>
  )
}