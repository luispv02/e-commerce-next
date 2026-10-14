"use client";

import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

const TEST_CARD_NUMBER = "4242424242424242";

export const TestPaymentNotice = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(TEST_CARD_NUMBER);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="w-full rounded-lg border border-blue-200 bg-blue-50 p-3 sm:p-2">
      <div className="flex items-start gap-2.5">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-blue-900">
            Pago de prueba
          </p>

          <p className="mt-0.5 text-xs leading-relaxed text-blue-800">
            Usa estos datos en Stripe. No se realizarán cobros reales en
            el entorno de prueba.
          </p>

          <div className="mt-3 flex flex-col gap-2 rounded-md border border-blue-200 bg-white p-1 min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between">
            <div className="min-w-0">
              <p className="text-xs text-slate-500">Tarjeta Visa</p>
              <p className="mt-1 break-all font-mono text-xs font-medium tracking-wide text-slate-800">
                4242 4242 4242 4242
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex min-h-8 w-full shrink-0 items-center justify-center gap-1.5 rounded-md border border-slate-200 px-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 min-[380px]:w-auto cursor-pointer"
            >
              {copied ? (
                <>
                  <FiCheck className="size-3.5 text-green-600" />
                  Copiado
                </>
              ) : (
                <>
                  <FiCopy className="size-3.5" />
                  Copiar
                </>
              )}
            </button>
          </div>

          <div className="mt-2">
            <p className="text-xs text-blue-800">Vencimiento: cualquier fecha futura</p>
            <p className="text-xs text-blue-800">CVC: 3 dígitos cualquier.</p>
          </div>
        </div>
      </div>
    </div>
  );
};