export const productCategories = [
  {
    id: "all",
    label: "Todos",
  },
  {
    id: "clothes",
    label: "Ropa",
  },
  {
    id: "technology",
    label: "Tecnología",
  },
  {
    id: "others",
    label: "Otros",
  },
] as const;

export const getProductCategoryLabel = (category: string) => {
  return productCategories.find((option) => option.id === category)?.label ?? category;
}