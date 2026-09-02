import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Samsung Galaxy S23",
    price: 15999,
    category: "Tecnología",
    image: "/images/products/samsung-s23.png",
    badge: {
      label: "Nuevo",
      variant: "success",
    },
  },
  {
    id: "2",
    name: "Laptop Lenovo IdeaPad 3",
    price: 12999,
    category: "Tecnología",
    image: "/images/products/lenovo-ideapad.png",
  },
  {
    id: "3",
    name: "Audífonos Sony WH-1000XM5",
    price: 6999,
    oldPrice: 8999,
    category: "Accesorios",
    image: "/images/products/sony-wh1000xm5.png",
    badge: {
      label: "Oferta",
      variant: "success",
    },
  },
  {
    id: "4",
    name: "Camisa formal blanca",
    price: 599,
    category: "Ropa",
    image: "/images/products/camisa-formal.png",
  },
  {
    id: "5",
    name: "Sudadera con capucha",
    price: 699,
    category: "Ropa",
    image: "/images/categories/clothes.png",
    badge: {
      label: "Más vendido",
      variant: "warning",
    },
  },
  {
    id: "6",
    name: "Mochila urbana",
    price: 899,
    category: "Accesorios",
    image: "/images/categories/others.png",
  },
  {
    id: "7",
    name: "Apple Watch Series 9",
    price: 8999,
    category: "Tecnología",
    image: "/images/products/apple-watch.png",
  },
  {
    id: "8",
    name: "Planta decorativa",
    price: 299,
    category: "Hogar",
    image: "/images/categories/others.png",
  },
];
