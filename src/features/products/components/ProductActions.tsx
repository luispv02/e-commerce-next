import { Product, ProductVariant } from "@/types/product";
import { FiShoppingBag } from "react-icons/fi";

interface ProductActionsProps {
  product: Product;
  variants?: ProductVariant;
}

export const ProductActions = ({ product, variants }: ProductActionsProps) => {

  const handleAddToCart = () => {
    const item = {
      productId: product.id,
      quantity: 1,
      ...(product.category === "clothes" && {
        variants,
      }),
    };

    console.log(item);
  };

  const isVariantsRequired = product.category === "clothes" && ((product.sizes.length > 0 && !variants?.size) || (product.colors.length > 0 && !variants?.color));
  const isOutOfStock = product.stock <= 0;
  const isDisabled = isVariantsRequired || isOutOfStock;

  return (
    <div className="flex flex-col gap-3 sm:ƒflex-row">
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isDisabled}
        className="cursor-pointer inline-flex w-full h-14 items-center justify-center gap-3 rounded-xl bg-slate-950 px-6 text-base font-bold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiShoppingBag className="size-5" />
        Agregar al carrito
      </button>
    </div>
  );
};
