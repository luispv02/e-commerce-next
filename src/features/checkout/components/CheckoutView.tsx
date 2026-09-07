"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

import { cart } from "@/features/cart/data/cart-items";
import type { ShippingAddressFormData } from "@/features/checkout/schemas/address";

import { AddressForm } from "./AddressForm";
import { AddressSummary } from "./AddressSummary";
import { CheckoutSteps } from "./CheckoutSteps";
import { ProductReviewList } from "./ProductReviewList";
import { OrderSummary } from "./OrderSummary";

export const CheckoutView = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddressFormData | null>(null);

  const itemCount = useMemo(() => {
    return cart.items.reduce((total, item) => total + item.quantity, 0)
  }, [])

  const subtotal = useMemo(() => {
    return cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0,)
  }, [])

  const isReview = step === 2;

  const handleAddressContinue = (data: ShippingAddressFormData) => {
    setShippingAddress(data);
    setStep(2);
  };

  return (
    <section className={`mx-auto w-full pb-16 ${isReview ? "max-w-316" : "max-w-238"}`}>
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#29477b] transition hover:text-slate-950"
      >
        <FiArrowLeft className="size-4" />
        Volver al carrito
      </Link>

      <header className="mt-5">
        <h1 className="text-[28px] font-bold leading-tight tracking-tight text-slate-950 md:text-[32px]">
          {isReview ? "Revisar pedido" : "Dirección"}
        </h1>

        <p className="mt-1 text-base text-[#38558a]">
          {isReview
            ? "Confirma que toda la información sea correcta antes de realizar el pago."
            : "Ingresa la dirección donde quieres recibir tu pedido."}
        </p>
      </header>

      <CheckoutSteps currentStep={step} className="mt-6 md:mt-5" />

      {isReview ? (
        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_344px]">
          <div className="space-y-4">
            {shippingAddress && (
              <AddressSummary
                address={shippingAddress}
                onEdit={() => setStep(1)}
              />
            )}

            <ProductReviewList
              items={cart.items}
              itemCount={itemCount}
            />
          </div>

          <OrderSummary
            itemCount={itemCount}
            subtotal={subtotal}
          />
        </div>
      ) : (
        <div className="mt-7">
          <AddressForm onContinue={handleAddressContinue} />
        </div>
      )}
    </section>
  );
};
