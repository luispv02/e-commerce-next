import { ProductsListResponse } from "@/types/product-api";

export const productsResponse: ProductsListResponse = {
  "ok": true,
  "data": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalProducts": 35,
      "totalPages": 4
    },
    "products": [
      {
        "id": "08745daa-f850-4c52-aebf-42f381c74172",
        "title": "Camisa casual manga larga slim fit",
        "price": 499,
        "description": "Camisa slim fit casual.",
        "stock": 70,
        "category": "clothes",
        "images": [
          {
            "id": "a4166f04-ccd6-4008-a70e-451f5408e551",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767741109/ecommerce/products/vgr4web3w2vvmuyc9pjk.jpg",
            "publicId": "ecommerce/products/vgr4web3w2vvmuyc9pjk"
          },
          {
            "id": "c51fef6c-5400-49ff-8f03-b3db498ad6a0",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767741109/ecommerce/products/exkx62ptd72farn9dbef.jpg",
            "publicId": "ecommerce/products/exkx62ptd72farn9dbef"
          }
        ],
        "isActive": false,
        "sizes": ["m", "l", "xl", "xxl"],
        "gender": "men",
        "colors": ["blue", "white"],
        "type": "shirts",
        "isFeatured": false,
        "slug": "camisa-casual-manga-larga-slim-fit"
      },
      {
        "id": "92e59578-441f-42de-96f1-db0d812112a9",
        "title": "Playera estampada juvenil",
        "price": 199,
        "description": "Playera con estampado moderno, ideal para outfits casuales.",
        "stock": 50,
        "category": "clothes",
        "images": [
          {
            "id": "8107d8c5-9be8-434b-ab7c-6d70e2ac5c56",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767741255/ecommerce/products/uxyqozdxkfh6efuhm1d6.jpg",
            "publicId": "ecommerce/products/uxyqozdxkfh6efuhm1d6"
          }
        ],
        "isActive": false,
        "sizes": ["xs", "s", "m"],
        "gender": "kid",
        "colors": ["white"],
        "type": "t-shirts",
        "isFeatured": false,
        "slug": "playera-estampada-juvenil"
      },
      {
        "id": "fa3e7cfa-c30f-4a4f-be5f-ef3239a68bb5",
        "title": "Pantalón de mezclilla recto",
        "price": 699,
        "description": "Pantalón de mezclilla resistente con ajuste clásico.",
        "stock": 59,
        "category": "clothes",
        "images": [
          {
            "id": "4190420f-ade5-4a0f-8e2d-bc49cf010697",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767741476/ecommerce/products/iudiuudksk1zu3vhr71b.jpg",
            "publicId": "ecommerce/products/iudiuudksk1zu3vhr71b"
          },
          {
            "id": "836c8ca7-c14d-47a5-9138-05c5559decc6",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767741476/ecommerce/products/crgz6ri1eshb5rdqvfjw.jpg",
            "publicId": "ecommerce/products/crgz6ri1eshb5rdqvfjw"
          },
          {
            "id": "effb1e11-0b49-4db9-b044-e89dc5754c62",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767741476/ecommerce/products/j0lmxvw0y6amtwcpxwru.jpg",
            "publicId": "ecommerce/products/j0lmxvw0y6amtwcpxwru"
          }
        ],
        "isActive": false,
        "sizes": ["s", "m", "l"],
        "gender": "women",
        "colors": ["blue"],
        "type": "pants",
        "isFeatured": false,
        "slug": "pantalon-de-mezclilla-recto"
      },
      {
        id: "57890fff-b9ca-4cfc-992e-5c79ae32fcf9",
        title: "Botella térmica acero inoxidable",
        price: 399,
        description: "Mantiene bebidas frías o calientes por varias horas.",
        slug: "botella-termica-acero-inoxidable",
        stock: 34,
        isFeatured: false,
        category: "others",
        isActive: true,
        images: [
          {
            id: "22de18ac-c3d5-4532-a435-d537535b5638",
            url: "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767743297/ecommerce/products/u46qah3kb8bqvsemqaae.jpg",
            publicId: "ecommerce/products/u46qah3kb8bqvsemqaae",
          },
          {
            id: "416f7eca-ef78-459b-9e72-8a7dffeaa936",
            url: "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767743297/ecommerce/products/izy221gvndablpf3g5vy.jpg",
            publicId: "ecommerce/products/izy221gvndablpf3g5vy",
          },
          {
            id: "77834c1b-91f0-41a9-bb3a-511b9c8e8f2e",
            url: "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767743297/ecommerce/products/dqajpzdaniezycxjs1jz.jpg",
            publicId: "ecommerce/products/dqajpzdaniezycxjs1jz",
          },
          {
            id: "bab9eec4-2aa9-402b-b07b-2dd246cab884",
            url: "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767743297/ecommerce/products/koydodz4gc7cxwd1sjkv.jpg",
            publicId: "ecommerce/products/koydodz4gc7cxwd1sjkv",
          },
        ],
      },
      {
        "id": "4cc6abde-cc89-4d48-8dd8-264ee750f82b",
        "title": "Playera oversize urbana",
        "price": 279,
        "description": "Playera de corte amplio, estilo urbano moderno.",
        "stock": 80,
        "category": "clothes",
        "images": [
          {
            "id": "88ee48db-979a-4cc5-9811-292cafb117bc",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1771460550/ecommerce/products/zilhox3m30uwfoac12kg.jpg",
            "publicId": "ecommerce/products/zilhox3m30uwfoac12kg"
          },
          {
            "id": "dc4d9742-687f-4632-a9f7-84b25441e1c1",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1771460550/ecommerce/products/dgr0hbd1gjzh1tdwjqkw.jpg",
            "publicId": "ecommerce/products/dgr0hbd1gjzh1tdwjqkw"
          },
          {
            "id": "fd41197b-7502-4b9a-abe3-85946b09f3bb",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1771460550/ecommerce/products/hexjtrx0ytpc7bx6yip1.jpg",
            "publicId": "ecommerce/products/hexjtrx0ytpc7bx6yip1"
          }
        ],
        "isActive": true,
        "sizes": ["m", "l", "xl"],
        "gender": "men",
        "colors": ["black"],
        "type": "t-shirts",
        "isFeatured": false,
        "slug": "playera-oversize-urbana"
      },
      {
        "id": "fa5f7ca6-cd05-4253-9023-257a1786992c",
        "title": "Camisa de lino fresca",
        "price": 749,
        "description": "Camisa ligera de lino, ideal para climas cálidos.",
        "stock": 39,
        "category": "clothes",
        "images": [
          {
            "id": "11c97045-c3f2-467a-9ad6-862c84c4ee9d",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767741987/ecommerce/products/borg9pfkqwylzbhrti4c.jpg",
            "publicId": "ecommerce/products/borg9pfkqwylzbhrti4c"
          },
          {
            "id": "14cc6e47-fac2-4c7d-809e-f925a3c26f59",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767741987/ecommerce/products/ykseda8yrlueideh1hin.jpg",
            "publicId": "ecommerce/products/ykseda8yrlueideh1hin"
          },
          {
            "id": "9cb2cf02-9d24-4fbb-8a06-a00b1b19d722",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767741987/ecommerce/products/sjqt7ppjcyhwojocbrkk.jpg",
            "publicId": "ecommerce/products/sjqt7ppjcyhwojocbrkk"
          },
          {
            "id": "f839b90c-2800-4f66-97bd-12cedc5278a7",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767741987/ecommerce/products/fzvi3qtvp7a2gk5yqdmg.jpg",
            "publicId": "ecommerce/products/fzvi3qtvp7a2gk5yqdmg"
          }
        ],
        "isActive": true,
        "sizes": ["s", "m", "l"],
        "gender": "women",
        "colors": ["white"],
        "type": "shirts",
        "isFeatured": false,
        "slug": "camisa-de-lino-fresca"
      },
      {
        "id": "ad1772db-1325-431e-b30b-53168c3f2e74",
        "title": "Lámpara LED de escritorio",
        "price": 549,
        "description": "Lámpara con luz ajustable y diseño moderno.",
        "slug": "lampara-led-de-escritorio",
        "stock": 58,
        "isFeatured": false,
        "category": "others",
        "isActive": true,
        "images": [
          {
            "id": "289afc5f-d7de-4f49-8b18-90715347b326",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767743327/ecommerce/products/vcr1kkj6nyhgumczn3by.jpg",
            "publicId": "ecommerce/products/vcr1kkj6nyhgumczn3by",
          },
          {
            "id": "92a0cc2d-a4c2-489d-8462-9d599ddbb7aa",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767743327/ecommerce/products/p0gw3dyucvufcsbuwtjo.jpg",
            "publicId": "ecommerce/products/p0gw3dyucvufcsbuwtjo",
          },
          {
            "id": "a1c242c8-ad67-4406-9ca1-905b49660ae1",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767743326/ecommerce/products/lszwwexjeddzmrvk7rh5.jpg",
            "publicId": "ecommerce/products/lszwwexjeddzmrvk7rh5",
          },
          {
            "id": "f0f8bb0c-5b8a-4104-b0c4-e0785c8b331e",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767743326/ecommerce/products/kkufr4zfpxegruvvblha.jpg",
            "publicId": "ecommerce/products/kkufr4zfpxegruvvblha",
          },
        ],
      },
      {
        "id": "9dd8048f-a67f-4c9f-85f6-5b6b6b9dbd72",
        "title": "Playera deportiva transpirable",
        "price": 299,
        "description": "Playera ligera con tela transpirable para actividad física.",
        "stock": 50,
        "category": "clothes",
        "images": [
          {
            "id": "1fd8778e-0e7a-4d84-8f00-c1a9d21de53d",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767742128/ecommerce/products/h5udb8quxdqvmyipzjwp.jpg",
            "publicId": "ecommerce/products/h5udb8quxdqvmyipzjwp"
          },
          {
            "id": "4eae078e-52b2-42d2-8259-ba75ad823bd8",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767742128/ecommerce/products/j6zatupnr3evulix73yk.jpg",
            "publicId": "ecommerce/products/j6zatupnr3evulix73yk"
          },
          {
            "id": "7ef0c83b-780c-43e3-a229-72bbf713907f",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767742128/ecommerce/products/qa5mn2vujrlqlvn4mdgf.jpg",
            "publicId": "ecommerce/products/qa5mn2vujrlqlvn4mdgf"
          },
          {
            "id": "88e26fb0-f577-4c77-99b7-b42380ce2323",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767742128/ecommerce/products/bwd7fk0culmmtpt7nyzu.jpg",
            "publicId": "ecommerce/products/bwd7fk0culmmtpt7nyzu"
          }
        ],
        "isActive": true,
        "sizes": ["s", "m", "xl"],
        "gender": "men",
        "colors": ["black"],
        "type": "t-shirts",
        "isFeatured": false,
        "slug": "playera-deportiva-transpirable"
      },
      {
        "id": "2a6083c2-9116-4e6b-b637-496bdace8ecc",
        "title": "Samsung Galaxy S23",
        "price": 15999,
        "description": "Teléfono Android con pantalla AMOLED y excelente cámara.",
        "stock": 41,
        "category": "technology",
        "images": [
          {
            "id": "2db876ac-10fc-4ad7-adac-585e567d08b4",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767742611/ecommerce/products/a15ybnt0o0di0i400sxm.jpg",
            "publicId": "ecommerce/products/a15ybnt0o0di0i400sxm"
          },
          {
            "id": "568c6979-4bbf-48cf-a21b-8b0fc12a2613",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767742611/ecommerce/products/uqvq2ufhpfq2im6lh9ht.jpg",
            "publicId": "ecommerce/products/uqvq2ufhpfq2im6lh9ht"
          },
          {
            "id": "c8aaafa1-56ca-4839-ba69-87cbf95d998f",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767742612/ecommerce/products/zz335dmwmxvfjniqm4xb.jpg",
            "publicId": "ecommerce/products/zz335dmwmxvfjniqm4xb"
          }
        ],
        "isActive": true,
        "brand": "samsung",
        "type": "smartphones",
        "isFeatured": false,
        "slug": "samsung-galaxy-s23"
      },
      {
        "id": "a4fbc5d7-03ad-4690-a7bf-dbb5244f9762",
        "title": "Laptop Lenovo IdeaPad 3",
        "price": 12999,
        "description": "Laptop ideal para trabajo y estudio con buen rendimiento.",
        "stock": 48,
        "category": "technology",
        "images": [
          {
            "id": "3267e76c-2a7f-44ee-a17a-dffde6f021cf",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767742674/ecommerce/products/v6tdedwapokul1iqi1ac.jpg",
            "publicId": "ecommerce/products/v6tdedwapokul1iqi1ac"
          },
          {
            "id": "8c23cfcf-9d85-4e05-8894-e05271935cd1",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767742673/ecommerce/products/dj4osum7wnyumbi7nkkp.jpg",
            "publicId": "ecommerce/products/dj4osum7wnyumbi7nkkp"
          },
          {
            "id": "8f8f7c09-83ef-49e7-8fc0-7b042c63b0b5",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767742674/ecommerce/products/ajng1tlpicv89xiny9aj.jpg",
            "publicId": "ecommerce/products/ajng1tlpicv89xiny9aj"
          },
          {
            "id": "dd162bcf-b0e4-4d51-ad46-c65503767d21",
            "url": "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767742674/ecommerce/products/ht4qtkeygqg9ytjg1x2u.jpg",
            "publicId": "ecommerce/products/ht4qtkeygqg9ytjg1x2u"
          }
        ],
        "isActive": true,
        "brand": "lenovo",
        "type": "laptops",
        "isFeatured": false,
        "slug": "laptop-lenovo-ideapad-3"
      }
    ]
  }
}