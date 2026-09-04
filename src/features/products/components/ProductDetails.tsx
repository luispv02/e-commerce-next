import type { ReactNode } from "react";
import clsx from "clsx";
import { FiCpu, FiInfo, FiTag, FiUser } from "react-icons/fi";

import type { Product } from "../types/product";
import { getProductFilterLabel } from "@/lib/product-filters";
import { formatPrice } from "@/lib/format-price";

interface ProductDetailsProps {
  product: Product;
  variants?: ReactNode;
  actions: ReactNode;
}

interface AttributeItem {
  label: string;
  value: string;
  icon: ReactNode;
}

const getProductAttributes = (product: Product): AttributeItem[] => {
  if (product.category === "clothes") {
    return [
      {
        label: "Género",
        value: getProductFilterLabel(product.category, "gender", product.gender),
        icon: <FiUser className="size-4" />,
      },
      {
        label: "Tipo",
        value: getProductFilterLabel(product.category, "type", product.type),
        icon: <FiTag className="size-4" />,
      },
    ];
  }

  if (product.category === "technology") {
    return [
      {
        label: "Marca",
        value: getProductFilterLabel(product.category, "brand", product.brand),
        icon: <FiCpu className="size-4" />,
      },
      {
        label: "Tipo",
        value: getProductFilterLabel(product.category, "type", product.type),
        icon: <FiTag className="size-4" />,
      },
    ];
  }

  return [];
};

export const ProductDetails = ({ product, variants, actions }: ProductDetailsProps) => {
  const attributes = getProductAttributes(product);
  const isInStock = product.stock > 0;

  return (
    <section className="flex h-full flex-col">
      <div className="border-b border-slate-200 pb-7">
        <span
          className={clsx("inline-flex h-9 items-center rounded-full px-4 text-sm font-bold", isInStock
            ? "bg-emerald-100 text-emerald-700"
            : "bg-rose-100 text-rose-700",
          )}
        >
          {isInStock ? "En stock" : "Agotado"}
        </span>

        <h1 className="mt-5 text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-[44px]">
          {product.title}
        </h1>

        <p className="mt-5 text-3xl font-black tracking-tight text-slate-950">
          {formatPrice(product.price)}
        </p>
      </div>

      <div className="space-y-8 py-8">
        <section className="grid grid-cols-[44px_1fr] gap-4">
          <div className="flex size-11 items-center justify-center rounded-full bg-slate-100 text-slate-600">
            <FiInfo className="size-5" />
          </div>

          <p className="text-sm leading-6 text-slate-700">
            {product.description}
          </p>
        </section>

        {attributes.map((attribute) => (
          <section
            key={attribute.label}
            className="grid grid-cols-[44px_1fr] gap-4"
          >
            <div className="flex size-11 items-center justify-center rounded-full bg-slate-100 text-slate-600">
              {attribute.icon}
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-950">
                {attribute.label}
              </h2>
              <div className="mt-3">
                <span className="inline-flex min-h-10 items-center rounded-lg bg-slate-950 px-4 text-sm font-semibold capitalize text-white">
                  {attribute.value}
                </span>
              </div>
            </div>
          </section>
        ))}

        {variants}
      </div>


      <div className="mt-auto pt-1">{actions}</div>
    </section>
  );
};
