"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";

interface AdminShellProps {
  children: React.ReactNode;
}

export const AdminShell = ({ children }: AdminShellProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="flex min-h-dvh w-full min-w-0 overflow-x-hidden bg-slate-50 h-screen">
      <AdminSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar onMenuClick={() => setMenuOpen(true)} />

        <main className="min-w-0 flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
