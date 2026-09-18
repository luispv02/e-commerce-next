"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import useEmblaCarousel from "embla-carousel-react";

import type { Product } from "../../../types/product";

interface ProductGalleryProps {
  product: Product;
}

export const ProductGallery = ({ product }: ProductGalleryProps) => {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = product.images[selectedIndex];
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
  });

  const scrollToImage = useCallback((index: number) => {
    emblaApi?.scrollTo(index)
  }, [emblaApi]);
  
  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleSelect);

    return () => {
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleSelect);
    };
  }, [emblaApi]);

  if (!product.images.length || !selectedImage) {
    return (
      <div className="flex min-h-96 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-400">
        Imagen no disponible
      </div>
    );
  }

  return (
    <section aria-label="Galería del producto" className="grid gap-4 md:grid-cols-[88px_minmax(0,1fr)] lg:gap-5">
      <div className="order-2 flex flex-wrap gap-2">
        {product.images.map((image, index) => {
          const isSelected = selectedImage.id === image.id;

          return (
            <button
              key={image.id}
              type="button"
              aria-label={`Ver imagen ${index + 1} de ${product.title}`}
              aria-pressed={isSelected}
              onClick={() => scrollToImage(index)}
              className={clsx("relative h-22 w-18 shrink-0 overflow-hidden rounded-xl border bg-white transition sm:h-28  md:w-full cursor-pointer", isSelected
                ? "border-slate-950 shadow-sm"
                : "border-slate-200 hover:border-slate-400",
              )}
            >
              <Image
                src={image.url}
                alt={`${product.title} miniatura ${index + 1}`}
                fill
                sizes="(max-width: 768px) 72px, 88px"
                className="object-contain"
              />
            </button>
          );
        })}
      </div>

      <div className="relative order-1 aspect-4/5 min-h-90 overflow-hidden rounded-2xl border border-slate-200 md:order-2 lg:min-h-155">
        <div ref={emblaRef} className="h-full overflow-hidden">
          <div className="flex h-full touch-pan-y">
            {product.images.map((image, index) => (
              <div
                key={image.id}
                className="relative h-full min-w-0 flex-[0_0_100%]"
              >
                <Image
                  src={image.url}
                  alt={index === 0 ? product.title : `${product.title} imagen ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 700px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
