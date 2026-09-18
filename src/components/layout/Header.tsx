import Link from "next/link"
import { FiShoppingCart, FiUser } from "react-icons/fi"
import { ProductSearch } from "./ProductSearch"
import { Suspense } from "react"


export const Header = () => {


  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="h-16 flex justify-between items-center">

          <Link href="/" className="justify-self-start text-lg font-semibold tracking-tight text-slate-950">
            E-Commerce
          </Link>

          {/* Navigation  */}
          <nav className="hidden items-center justify-center gap-7 md:flex">
            <Link href="/" className="text-sm font-medium text-slate-950">
              Inicio
            </Link>

            <Link href="/products" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
              Productos
            </Link>
          </nav>

          {/* Search + Actions */}
          <div className="hidden items-center justify-self-end gap-5 md:flex">
            <Suspense fallback={null}>
              <ProductSearch />
            </Suspense>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link
                href="/cart"
                aria-label="Carrito"
                className="text-slate-700 transition hover:text-slate-950"
              >
                <FiShoppingCart className="size-5" />
              </Link>

              <Link
                href="/admin"
                aria-label="Perfil"
                className="text-slate-700 transition hover:text-slate-950"
              >
                <FiUser className="size-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile search */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Suspense fallback={null}>
              <ProductSearch />
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  )
}