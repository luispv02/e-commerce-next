"use client";

import clsx from "clsx";
import { useState } from "react";

interface ProductStatusToggleProps {
  isActive: boolean;
}

export const ProductStatusToggle = ({ isActive }: ProductStatusToggleProps) => {
  const [enabled, setEnabled] = useState(isActive);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={enabled ? "Producto activo" : "Producto inactivo"}
      onClick={() => setEnabled((current) => !current)}
      className={clsx("relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition cursor-pointer", enabled ? "bg-emerald-500" : "bg-slate-300")}
    >
      <span className={clsx("inline-block size-4 transform rounded-full bg-white shadow transition-transform duration-200", enabled ? "translate-x-6" : "translate-x-1")}
      />
    </button>
  );
};
