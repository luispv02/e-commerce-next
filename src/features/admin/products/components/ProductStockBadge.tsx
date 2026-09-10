interface ProductStockBadgeProps {
  stock: number;
}

export const ProductStockBadge = ({ stock }: ProductStockBadgeProps) => {
  const isHighStock = stock >= 60;

  return (
    <span
      className={isHighStock
        ? "inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"
        : "inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700"
      }
    >
      {stock} unidades
    </span>
  );
};
