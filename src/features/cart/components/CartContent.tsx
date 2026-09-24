"use client";

import Link from "next/link";
import { FiArrowLeft, FiLock } from "react-icons/fi";

import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { EmptyCart } from "./EmptyCart";
import { Cart } from "../types/cart";

interface CartContentProps {
  cart: Cart | null;
}

export const CartContent = ({ cart }: CartContentProps) => {

  if (!cart || cart.items.length === 0) {
    return <EmptyCart />;
  }

  const items = cart.items;

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <>
      <Link
        href="/products"
        className="mb-4 flex items-center gap-2 text-sm text-slate-500 transition hover:text-black"
      >
        <FiArrowLeft className="size-4" />
        Seguir comprando
      </Link>

      <header className="mb-5 md:mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
          Tu carrito de compras
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          {itemCount} productos
        </p>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          {/* Mobile */}
          <div className="space-y-3 md:hidden">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Desktop */}
          <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white md:block">
            <div className="min-w-175">
              <div className="grid grid-cols-[minmax(0,1fr)_104px_148px_104px_40px] items-center border-b border-slate-200 px-6 py-3 text-xs font-semibold tracking-wide text-slate-900">
                <span>Producto</span>
                <span className="text-center">Precio</span>
                <span className="text-center">Cantidad</span>
                <span className="text-right">Subtotal</span>
                <span className="sr-only">Eliminar</span>
              </div>

              <div className="divide-y divide-slate-200">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <CartSummary
            itemCount={itemCount}
            subtotal={subtotal}
          />

          <div className="mt-4 md:hidden">
            <Link
              href="/checkout"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 text-sm font-semibold text-white"
            >
              <FiLock className="size-4" />
              Finalizar compra
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};