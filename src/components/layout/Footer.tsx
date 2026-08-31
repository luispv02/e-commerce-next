import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

const navigation = [
  {
    label: "Inicio",
    href: "/",
  },
  {
    label: "Productos",
    href: "/products",
  },
];

export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
        <div className="grid gap-10 md:grid-cols-2">

          <div>
            <Link href="/" className="inline-block text-lg font-semibold tracking-tight text-slate-950">
              E-Commerce
            </Link>

            <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">
              Tu tienda online.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:justify-self-end">
            <h2 className="text-sm font-semibold text-slate-950">
              Navegación
            </h2>

            <nav className="mt-4 flex flex-col gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex w-fit items-center gap-1 text-sm text-slate-500 transition hover:text-slate-950"
                >
                  {item.label}

                  <FiArrowUpRight className="size-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}