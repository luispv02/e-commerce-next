"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BiSortAlt2 } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";

export const ProductSort = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentOrder = searchParams.get("order");

  const desktopOrder = currentOrder ?? "any";
  const mobileOrder = currentOrder ?? "";

  const sortOptions = [
    { value: "any", label: "Por defecto" },
    { value: "price-asc", label: "Precio: menor a mayor" },
    { value: "price-desc", label: "Precio: mayor a menor" },
    { value: "newest", label: "Más recientes" },
    { value: "oldest", label: "Más antiguos" },
  ];

  const handleSortChange = (order: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!order) {
      params.delete("order");
    } else {
      params.set("order", order);
    }

    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="product-sort-desktop" className="hidden whitespace-nowrap text-sm text-slate-500 lg:block">
        Ordenar por
      </label>

      {/* Mobile Select */}
      <div className="relative md:hidden flex items-center justify-evenly rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 py-2 px-3">
        <BiSortAlt2 className="size-4 text-slate-600"/>

        <select
          id="product-sort-mobile"
          aria-label="Ordenar productos"
          value={mobileOrder}
          onChange={(event) => handleSortChange(event.target.value)}
          className="appearance-none bg-transparent text-sm font-medium text-slate-700 outline-none text-center px-2"
        >
          <option value="" disabled>
            Ordenar por
          </option>

          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <FiChevronDown className="size-4 text-slate-600" />
      </div>

      {/* Desktop Select */}
      <div className="relative hidden md:block">
        <select
          id="product-sort-desktop"
          value={desktopOrder}
          onChange={(event) => handleSortChange(event.target.value)}
          className="h-10 appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm font-medium text-slate-700 outline-none transition focus:border-slate-400"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
      </div>
    </div>
  );
}
