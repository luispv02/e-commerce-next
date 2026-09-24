"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiChevronRight, FiLogIn, FiUser } from "react-icons/fi";

import { LogoutButton } from "./LogoutButton";
import { ProfileMenuItems } from "./ProfileMenuItems";
import { AnimatePresence, motion } from "motion/react";

interface UserMenuProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  name?: string;
  email?: string;
}

export const UserMenu = ({ isAuthenticated, isAdmin, name, email }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-label="Perfil"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-slate-700 transition hover:text-slate-950 cursor-pointer"
      >
        <FiUser className="size-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-50 mt-3 w-80 origin-top-right overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
          >
            {isAuthenticated ? (
              <>
                <div className="border-b border-slate-100 px-4 py-4">
                  <p className="truncate text-sm font-semibold text-slate-950">
                    {name}
                  </p>

                  <p className="truncate text-sm text-slate-500">
                    {email}
                  </p>
                </div>

                <div className="divide-y divide-slate-100">
                  <ProfileMenuItems isAdmin={isAdmin} onNavigate={() => setIsOpen(false)} />

                  <LogoutButton onLogout={() => setIsOpen(false)} />
                </div>
              </>
            ) : (
              <>
                <div className="border-b border-slate-100 px-4 py-4">
                  <p className="text-sm font-semibold text-slate-950">
                    Mi cuenta
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Inicia sesión para acceder a tu perfil y consultar tus compras.
                  </p>
                </div>

                <div className="p-2">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    <FiLogIn className="size-4" />
                    Iniciar sesión
                    <FiChevronRight className="ml-auto size-4 text-slate-400" />
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    <FiUser className="size-4" />
                    Crear cuenta
                    <FiChevronRight className="ml-auto size-4 text-slate-400" />
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};