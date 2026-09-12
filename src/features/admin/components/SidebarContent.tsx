import clsx from "clsx";
import Link from "next/link";
import { FiBox, FiGrid, FiLogOut, FiShoppingBag } from "react-icons/fi";

interface SidebarContentProps {
  pathname: string;
  onClose: () => void;
}

const navigation = [
  { href: "/admin", label: "Dashboard", icon: FiGrid },
  { href: "/admin/products", label: "Productos", icon: FiBox }
];


export const SidebarContent = ({ pathname, onClose }: SidebarContentProps) => {

  return (
    <>
      <div className="flex items-center gap-3 px-5 py-6">
        <span className="inline-flex size-10 items-center justify-center rounded-lg bg-blue-600">
          <FiShoppingBag className="size-5" />
        </span>
        <div>
          <p className="text-sm font-semibold">E-Commerce</p>
          <span className="mt-1 inline-flex rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-300">
            Admin
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navigation.map((item) => {
          const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className={clsx("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition", isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white",
              )}
            >
              <Icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <div className="mb-3 flex items-center gap-3">
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold">
            A
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Admin</p>
            <p className="truncate text-xs text-slate-400">admin@example.com</p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-400 hover:bg-slate-800"
        >
          <FiLogOut className="size-4" />
          Cerrar sesión
        </button>
      </div>
    </>
  );
};