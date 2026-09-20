"use client";

import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

interface LogoutButtonProps {
  onLogout?: () => void;
}

export const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(
        error.message ?? "No se pudo cerrar la sesión."
      );

      return;
    }

    onLogout?.();
    router.replace("/");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex w-full items-center gap-4 px-4 py-5 text-left transition hover:bg-slate-50"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
        <FiLogOut className="size-5 text-slate-600" />
      </div>

      <div className="flex-1">
        <p className="font-medium text-slate-950">
          Cerrar sesión
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Salir de tu cuenta.
        </p>
      </div>
    </button>
  );
};