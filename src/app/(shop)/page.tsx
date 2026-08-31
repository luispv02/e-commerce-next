import { Benefits } from "@/features/home/components/Benefits"
import { PopularCategories } from "@/features/home/components/Categories"
import { FeaturedProducts } from "@/features/home/components/FeaturedProducts"
import { Hero } from "@/features/home/components/Hero"


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