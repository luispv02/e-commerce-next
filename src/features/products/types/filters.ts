export interface FilterOption {
  id: string;
  label: string;
  hex?: string;
}

export type ProductFilterKey = "sizes" | "gender" | "colors" | "type" | "brand";

export interface Filter {
  title: string;
  filterKey: ProductFilterKey;
  multiple: boolean;
  options: FilterOption[];
}

