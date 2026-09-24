import Link from "next/link";
import {
  FiChevronRight,
  FiPackage,
  FiShield,
} from "react-icons/fi";

interface ProfileMenuItemsProps {
  isAdmin: boolean;
  onNavigate?: () => void;
}

export const ProfileMenuItems = ({ isAdmin, onNavigate }: ProfileMenuItemsProps) => {
  
  return (
    <>
      <Link
        href="/orders"
        onClick={onNavigate}
        className="flex items-center gap-4 px-4 py-5 transition hover:bg-slate-50"
      >
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
          <FiPackage className="size-5 text-slate-600" />
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium text-slate-950">
            Mis compras
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Consulta tu historial de pedidos.
          </p>
        </div>

        <FiChevronRight className="size-5 text-slate-400" />
      </Link>

      {isAdmin && (
        <Link
          href="/admin"
          onClick={onNavigate}
          className="flex items-center gap-4 px-4 py-5 transition hover:bg-slate-50"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
            <FiShield className="size-5 text-slate-600" />
          </div>

          <div className="flex-1">
            <p className="font-medium text-sm text-slate-950">
              Panel de administración
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Administra productos y pedidos.
            </p>
          </div>

          <FiChevronRight className="size-5 text-slate-400" />
        </Link>
      )}
    </>
  );
};