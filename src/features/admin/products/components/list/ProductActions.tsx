import Link from "next/link";
import { FiEdit2 } from "react-icons/fi";
import { DeleteProductButton } from "../DeleteProductButton";

interface ProductActionsProps {
  id: string;
  slug: string;
  title: string;
}

export const ProductActions = ({ id, slug, title }: ProductActionsProps) => {
  return (
    <div className="flex items- justify-end gap-2">
      <Link
        href={`/admin/products/${slug}/edit`}
        aria-label="Editar producto"
        className="cursor-pointer inline-flex size-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
      >
        <FiEdit2 className="size-3.5" />
      </Link>

      <DeleteProductButton
        productId={id}
        productTitle={title}
        className="cursor-pointer inline-flex size-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100"
      />
    </div>
  );
};
