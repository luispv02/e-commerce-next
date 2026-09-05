import { formatPrice } from "@/lib/format-price";
import Image from "next/image";
import type { OrderItem as OrderItemType } from "../types/orders";
import { getProductFilterLabel } from "@/lib/product-filters";;

interface OrderItemProps {
  item: OrderItemType;
}

export const OrderItem = ({ item }: OrderItemProps) => {
  const image = item.images[0];
  const subtotal = item.pricePaid * item.quantity;

  const color = item.variants?.color ? getProductFilterLabel('clothes', "colors", item.variants.color) : null;
  const size = item?.variants?.size ? getProductFilterLabel('clothes', "sizes", item.variants.size) : null;

  return (
    <article className="flex gap-3 py-3 md:gap-5 md:py-5">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-slate-50 md:size-24">
        {image && (
          <Image
            src={image.url}
            alt={item.title}
            fill
            sizes="(max-width: 767px) 80px, 96px"
            className="object-contain p-1"
          />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-sm font-bold leading-5 text-slate-950 md:text-base md:leading-6">
            {item.title}
          </h2>

          <p className="shrink-0 text-sm font-bold text-slate-950 md:text-base mt-1">
            {formatPrice(subtotal)}
          </p>
        </div>

        <div className="mt-2  text-xs leading-5 text-slate-500 md:text-sm">
          <p>
            Cantidad:{" "}
            <span className="font-semibold text-slate-950">{item.quantity}</span>
          </p>
          <p>
            Precio unidad:{" "}
            <span className="font-semibold text-slate-950">
              {formatPrice(item.pricePaid)}
            </span>
          </p>
          <p>
            Subtotal:{" "}
            <span className="font-semibold text-slate-950">
              {formatPrice(subtotal)}
            </span>
          </p>

          {(color || size) && (
            <p>
              {color && (
                <>
                  Color:{" "}
                  <span className="font-semibold text-slate-950">{color}</span>
                </>
              )}
              {color && size && <span className="mx-2 text-slate-300">|</span>}
              {size && (
                <>
                  Talla:{" "}
                  <span className="font-semibold text-slate-950">{size}</span>
                </>
              )}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};
