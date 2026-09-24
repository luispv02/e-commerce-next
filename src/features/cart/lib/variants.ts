import type { ProductVariant } from "@/types/product";

// Check whether two product variants are the same.
export const sameVariants = (first?: ProductVariant | null, second?: ProductVariant | null) => {
  return (
    first?.size === second?.size &&
    first?.color === second?.color
  );
};