"use client";

import { getPaginationRange, type PaginationItem } from "@/lib/pagination";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  totalPages: number;
}

export const Pagination = ({ totalPages }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  const pageParam = Number(searchParams.get("page")) || 1;
  const currentPage = Math.min(Math.max(pageParam, 1), totalPages);

  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const pages = getPaginationRange(currentPage, totalPages, 2);
  const mobilePages = getPaginationRange(currentPage, totalPages, 1);

  const previousButton = (
    <button
      type="button"
      disabled={currentPage === 1}
      onClick={() => handlePageChange(currentPage - 1)}
      aria-label="Página anterior"
      className={clsx("flex size-9 items-center justify-center rounded-lg border transition", currentPage === 1
        ? "cursor-not-allowed border-slate-200 text-slate-300"
        : "border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-950 cursor-pointer"
      )}
    >
      <FiChevronLeft className="size-4" />
    </button>
  );

  const nextButton = (
    <button
      type="button"
      disabled={currentPage === totalPages}
      onClick={() => handlePageChange(currentPage + 1)}
      aria-label="Página siguiente"
      className={clsx("flex size-9 items-center justify-center rounded-lg border transition", currentPage === totalPages
        ? "cursor-not-allowed border-slate-200 text-slate-300"
        : "border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-950 cursor-pointer"
      )}
    >
      <FiChevronRight className="size-4" />
    </button>
  );

  const renderPages = (items: PaginationItem[], key: string) => {
    return items.map((page, index) => {
      if (typeof page === "string") {
        return (
          <span
            key={`${key}-ellipsis-${index}`}
            className="flex size-9 items-center justify-center text-sm text-slate-400"
          >
            ...
          </span>
        );
      }

      return (
        <button
          key={`${key}-${page}`}
          type="button"
          onClick={() => handlePageChange(page)}
          aria-current={currentPage === page ? "page" : undefined}
          className={clsx("flex size-9 items-center justify-center rounded-lg text-sm font-medium transition cursor-pointer", currentPage === page
            ? "bg-slate-950 text-white"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
          )}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <nav aria-label="Paginación" className="mt-10">
      {/* Mobile */}
      <div className="flex items-center justify-center gap-1 sm:hidden">
        {previousButton}
        {renderPages(mobilePages, "mobile")}
        {nextButton}
      </div>

      {/* Desktop / Tablet */}
      <div className="hidden items-center justify-center gap-2 sm:flex">
        {previousButton}
        {renderPages(pages, "desktop")}
        {nextButton}
      </div>
    </nav>
  );
};