"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiShoppingBag, FiShoppingCart, FiUser } from "react-icons/fi";
import { CartIcon } from "./CartIcon";

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
    href: "/profile",
    icon: FiUser,
  },
];

interface MobileBottomMenuProps {
  cartItemCount: number;
}

export const MobileBottomMenu = ({ cartItemCount }: MobileBottomMenuProps) => {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] md:hidden">
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
              {href === "/cart" ? (
                <CartIcon
                  cartItemCount={cartItemCount}
                  badgeClassName="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-slate-950 text-[10px] font-bold text-white"
                  displayCount={cartItemCount}
                />
              ) : (
                <Icon className="size-5" />
              )}

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