"use client";

import { FiMenu } from "react-icons/fi";

interface AdminTopbarProps {
  onMenuClick: () => void;
}

export const AdminTopbar = ({ onMenuClick }: AdminTopbarProps) => {
  return (
    <header className="sticky top-0 z-30 flex justify-between lg:justify-end min-w-0 items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 lg:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Abrir menú"
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-700 lg:hidden"
      >
        <FiMenu className="size-5" />
      </button>

      <div className="shrink-0 items-center gap-2 rounded-lg px-2 py-1 inline-flex">
        <span className="inline-flex size-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
          A
        </span>
        <span className="text-sm font-medium text-slate-950">Admin</span>
      </div>
    </header>
  );
};
