"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiLoader, FiLogOut } from "react-icons/fi";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

interface LogoutButtonProps {
  onLogout?: () => void;
}

export const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    const { error } = await authClient.signOut();

    if (error) {
      toast.error(
        error.message ?? "No se pudo cerrar la sesión."
      );
      setIsLoggingOut(false);

      return;
    }

    onLogout?.();
    router.replace("/");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      aria-busy={isLoggingOut}
      className="flex w-full cursor-pointer items-center gap-4 px-4 py-5 text-left transition hover:bg-slate-50 disabled:cursor-wait disabled:opacity-70"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
        {isLoggingOut ? (
          <FiLoader className="size-5 animate-spin text-slate-600" />
        ) : (
          <FiLogOut className="size-5 text-slate-600" />
        )}
      </div>

      <div className="flex-1">
        <p className="text-sm font-medium text-slate-950">
          {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
        </p>

        {!isLoggingOut && (
          <p className="mt-1 text-xs text-slate-500">
            Salir de tu cuenta.
          </p>
        )}
      </div>
    </button>
  );
};