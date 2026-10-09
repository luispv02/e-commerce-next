import type { Metadata } from "next";
import { Benefits } from "@/features/home/components/Benefits"
import { PopularCategories } from "@/features/home/components/Categories"
import { FeaturedProducts } from "@/features/home/components/FeaturedProducts"
import { Hero } from "@/features/home/components/Hero"

export const metadata: Metadata = {
  title: "E-Commerce | Tu tienda en línea",
  description: "Descubre ropa, tecnología y más productos de calidad a excelentes precios.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <PopularCategories />
      <FeaturedProducts />
    </>
  )
}