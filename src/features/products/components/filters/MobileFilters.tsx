"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { Filters } from "./Filters";
import { LuSlidersHorizontal } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";

interface MobileFiltersProps {
  category: string;
}

export const MobileFilters = ({ category }: MobileFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 py-2 px-4"
      >
        <LuSlidersHorizontal className="size-4" />
        Filtros
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.button
              type="button"
              aria-label="Cerrar filtros"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-slate-950/40"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-y-0 right-0 z-90 flex w-full flex-col overflow-y-auto bg-white p-5 shadow-xl sm:max-w-md"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-950">
                  Filtros
                </h2>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100"
                  aria-label="Cerrar filtros"
                >
                  <IoCloseSharp className="size-5" />
                </button>
              </div>

              <Filters category={category} />

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="mt-6 w-full rounded-lg bg-slate-950 px-4 py-3 text-sm font-medium text-white cursor-pointer hover:bg-black/90"
              >
                Aplicar filtros
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}