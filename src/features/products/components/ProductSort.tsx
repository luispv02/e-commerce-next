"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BiSortAlt2 } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";

export const ProductSort = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort");
  const desktopSort = currentSort ?? "any";
  const mobileSort = currentSort ?? "";

  const sortOptions = [
    { value: "any", label: "Por defecto" },
    { value: "price-asc", label: "Precio: menor a mayor" },
    { value: "price-desc", label: "Precio: mayor a menor" },
    { value: "newest", label: "Más recientes" },
    { value: "oldest", label: "Más antiguos" },
  ];

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!sort) {
      params.delete("sort");
    } else {
      params.set("sort", sort);
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
      <div className="relative md:hidden flex items-center justify-evenly rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 py-2 pl-3 md:px-3">
        <BiSortAlt2 className="size-4 text-slate-600"/>

        <select
          id="product-sort-mobile"
          aria-label="Ordenar productos"
          value={mobileSort}
          onChange={(event) => handleSortChange(event.target.value)}
          className="appearance-none bg-transparent text-sm font-medium text-slate-700 outline-none text-center px-2 pr-4"
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
      </div>

      {/* Desktop Select */}
      <div className="relative hidden md:block">
        <select
          id="product-sort-desktop"
          value={desktopSort}
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
