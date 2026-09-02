import { Filter } from "../types/filters";

export const clothesFilters: Filter[] = [
  {
    title: "Talla",
    filterKey: "sizes",
    multiple: true,
    options: [
      { id: "xs", label: "XS" },
      { id: "s", label: "S" },
      { id: "m", label: "M" },
      { id: "l", label: "L" },
      { id: "xl", label: "XL" },
      { id: "xxl", label: "XXL" },
    ],
  },
  {
    title: "Género",
    filterKey: "gender",
    multiple: false,
    options: [
      { id: "men", label: "Hombres" },
      { id: "women", label: "Mujeres" },
      { id: "kid", label: "Niños" },
    ],
  },
  {
    title: "Color",
    filterKey: "colors",
     multiple: true,
    options: [
      { id: "white", label: "Blanco", hex: "#FFFFFF" },
      { id: "black", label: "Negro", hex: "#000000" },
      { id: "gray", label: "Gris", hex: "#808080" },
      { id: "red", label: "Rojo", hex: "#FF0000" },
      { id: "blue", label: "Azul", hex: "#0000FF" },
      { id: "green", label: "Verde", hex: "#008000" },
      { id: "yellow", label: "Amarillo", hex: "#FFFF00" },
      { id: "orange", label: "Naranja", hex: "#FFA500" },
      { id: "pink", label: "Rosa", hex: "#FFC0CB" },
    ],
  },
  {
    title: "Tipo",
    filterKey: "type",
     multiple: true,
    options: [
      { id: "shirts", label: "Camisas" },
      { id: "t-shirts", label: "Playeras" },
      { id: "pants", label: "Pantalones" },
      { id: "others", label: "Otros" },
    ],
  },
];

export const technologyFilters: Filter[] = [
  {
    title: "Tipo de producto",
    filterKey: "type",
     multiple: true,
    options: [
      { id: "laptops", label: "Laptops" },
      { id: "smartphones", label: "Smartphones" },
      { id: "headphones", label: "Auriculares" },
      { id: "smartwatches", label: "Smartwatches" },
      { id: "cameras", label: "Cámaras" },
      { id: "others", label: "Otros" },
    ],
  },
  {
    title: "Marca",
    filterKey: "brand",
     multiple: true,
    options: [
      { id: "apple", label: "Apple" },
      { id: "samsung", label: "Samsung" },
      { id: "xiaomi", label: "Xiaomi" },
      { id: "huawei", label: "Huawei" },
      { id: "lenovo", label: "Lenovo" },
      { id: "sony", label: "Sony" },
      { id: "others", label: "Otros" },
    ],
  },
];