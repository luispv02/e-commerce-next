export interface FilterOption {
  id: string;
  label: string;
  hex?: string;
}

export interface Filter {
  title: string;
  filterKey: string;
  multiple: boolean;
  options: FilterOption[];
}

