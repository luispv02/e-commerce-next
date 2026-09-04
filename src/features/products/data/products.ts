import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "c974e178-93f6-484e-8f86-d7dcb7891e0e",
    title: "Camisa formal blanca",
    price: 599,
    description: "Camisa formal de tela ligera, ideal para oficina o eventos.",
    slug: "camisa-formal-de-tela-ligera",
    stock: 77,
    isFeatured: false,
    category: "clothes",
    images: [
      {
        id: "3fecf983-af92-4a8a-9512-b4936431a719",
        url: "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767741555/ecommerce/products/nlwd7haknnm1ixkcyffx.jpg",
        publicId: "ecommerce/products/nlwd7haknnm1ixkcyffx",
      },
      {
        id: "e2439e3d-44c3-46eb-810d-054ec1d30b4c",
        url: "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767741555/ecommerce/products/kqeh1ya53zqp6dqersew.jpg",
        publicId: "ecommerce/products/kqeh1ya53zqp6dqersew",
      },
    ],
    isActive: true,
    sizes: ["m", "l", "xl"],
    gender: "men",
    colors: ["white", "red", "blue", "orange"],
    type: "shirts",
  },
  {
    id: "2a6083c2-9116-4e6b-b637-496bdace8ecc",
    title: "Samsung Galaxy S23",
    price: 15999,
    description: "Teléfono Android con pantalla AMOLED y excelente cámara.",
    slug: "telefono-android-con-pantalla-amoled",
    stock: 41,
    isFeatured: false,
    category: "technology",
    images: [
      {
        id: "2db876ac-10fc-4ad7-adac-585e567d08b4",
        url: "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767742611/ecommerce/products/a15ybnt0o0di0i400sxm.jpg",
        publicId: "ecommerce/products/a15ybnt0o0di0i400sxm",
      },
      {
        id: "568c6979-4bbf-48cf-a21b-8b0fc12a2613",
        url: "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767742611/ecommerce/products/uqvq2ufhpfq2im6lh9ht.jpg",
        publicId: "ecommerce/products/uqvq2ufhpfq2im6lh9ht",
      },
      {
        id: "c8aaafa1-56ca-4839-ba69-87cbf95d998f",
        url: "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767742612/ecommerce/products/zz335dmwmxvfjniqm4xb.jpg",
        publicId: "ecommerce/products/zz335dmwmxvfjniqm4xb",
      },
    ],
    isActive: true,
    brand: "samsung",
    type: "smartphones",
  },
  {
    id: "92ab44f8-5334-47af-9037-f1762c645c8e",
    title: "Mochila urbana impermeable",
    price: 899,
    description: "Mochila resistente ideal para uso diario y viajes.",
    slug: "mochila-resistente-ideal-para-uso-diario-y-viajes",
    stock: 45,
    isFeatured: false,
    category: "others",
    images: [
      {
        id: "6504c7a0-6a77-44ce-af59-54ec68f4197b",
        url: "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767743268/ecommerce/products/n1qaur2mnntzxffw5kk0.jpg",
        publicId: "ecommerce/products/n1qaur2mnntzxffw5kk0",
      },
      {
        id: "694f6a3a-2cfc-474c-b045-b03ba5662de3",
        url: "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767743268/ecommerce/products/yr0su74rrzdtkcoteonm.jpg",
        publicId: "ecommerce/products/yr0su74rrzdtkcoteonm",
      },
      {
        id: "9fc12094-e31a-46a5-be6c-4ebb8c6df01c",
        url: "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767743268/ecommerce/products/yaph10hya8vudy4zwrif.jpg",
        publicId: "ecommerce/products/yaph10hya8vudy4zwrif",
      },
      {
        id: "f48a7c46-bb8f-485f-b0d9-cb55c4a02de3",
        url: "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767743268/ecommerce/products/evhug9wegcxqcou3uhx3.jpg",
        publicId: "ecommerce/products/evhug9wegcxqcou3uhx3",
      },
    ],
    isActive: true,
  },
];
