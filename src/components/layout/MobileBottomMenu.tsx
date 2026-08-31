"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiShoppingBag, FiShoppingCart, FiUser } from "react-icons/fi";

const navigation = [
  {
    label: "Inicio",
    href: "/",
    icon: FiHome,
  },
  {
    label: "Productos",
    href: "/products",
    icon: FiShoppingBag,
  },
  {
    label: "Carrito",
    href: "/cart",
    icon: FiShoppingCart,
  },
  {
    label: "Perfil",
    href: "/account",
    icon: FiUser,
  },
];

export const MobileBottomMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white md:hidden">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around">
        {navigation.map(({ label, href, icon: Icon }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className={clsx("flex h-full min-w-20 flex-col items-center justify-center gap-1 transition", { "text-black/80": isActive, "text-slate-400": !isActive })}
            >
              <Icon className="size-5" />

              <span className="text-xs font-medium">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}