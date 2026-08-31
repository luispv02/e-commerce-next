import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: "1",
    name: "Samsung Galaxy S23",
    price: 15999,
    image: "/images/products/samsung-s23.png",
    category: "Tecnología",
  },
  {
    id: "2",
    name: "Camisa formal blanca",
    price: 599,
    image: "/images/products/camisa-formal.png",
    category: "Ropa",
  },
  {
    id: "3",
    name: "Laptop Lenovo IdeaPad 3",
    price: 12999,
    image: "/images/products/lenovo-ideapad.png",
    category: "Tecnología",
  },
  {
    id: "4",
    name: "Audífonos Sony WH-1000XM5",
    price: 6999,
    image: "/images/products/sony-wh1000xm5.png",
    category: "Accesorios",
  },
  {
    id: "5",
    name: "Apple Watch Series 9",
    price: 8999,
    image: "/images/products/apple-watch.png",
    category: "Tecnología",
  },
];

const formatPrice = (price: number) => new Intl.NumberFormat("es-MX").format(price);

export function FeaturedProducts() {
  return (
    <section className="py-10">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-950">
          Productos destacados
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <article
            key={product.id}
            className="group overflow-hidden rounded-xl border border-slate-200 bg-white flex flex-col justify-between"
          >
            <Link href={`/products/${product.id}`}>
              <div className="relative aspect-square overflow-hidden bg-slate-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-contain p-2 transition duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            <div className="p-4">
              <p className="text-xs text-slate-500">{product.category}</p>

              <Link href={`/products/${product.id}`}>
                <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-slate-950">
                  {product.name}
                </h3>
              </Link>

              <p className="mt-2 text-lg font-bold text-slate-950">
                ${formatPrice(product.price)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}