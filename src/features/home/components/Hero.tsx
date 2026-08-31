import Image from "next/image"
import Link from "next/link"


export const Hero = () => {
  return (
    <section>
      <div className="relative overflow-hidden rounded-2xl bg-slate-100">

        {/* Mobile background */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/images/home/hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-slate-100/80" />
        </div>

        <div className="grid md:grid-cols-[45%_55%] lg:grid-cols-[42%_58%] lg:py-4">
          
          {/* Content */}
          <div className="relative z-10 flex min-h-95 flex-col justify-center px-8 py-12 md:px-8 lg:px-12 xl:px-16">
            <h1 className="max-w-md text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Descubre todo lo que tenemos para ti
            </h1>

            <p className="mt-5 max-w-md text-base leading-7 text-slate-600">
              Productos de calidad, excelentes precios y todo lo que necesitas
              en un solo lugar.
            </p>

            <Link
              href="/products"
              className="mt-7 w-fit rounded-lg bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Ver productos
            </Link>
          </div>

          {/* Tablet / Desktop image */}
          <div className="relative hidden min-h-95 md:block">
            <Image
              src="/images/home/hero.png"
              alt="Productos de la tienda"
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 55vw"
              className="object-cover"
            />

            <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-slate-100 via-slate-100/70 to-transparent lg:hidden" />
          </div>
        </div>
      </div>
    </section>
  )
}