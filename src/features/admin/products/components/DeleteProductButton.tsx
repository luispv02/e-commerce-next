"use client";

import { deleteProduct } from "../actions/delete-product";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FiLoader, FiTrash2, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "motion/react";

interface DeleteProductButtonProps {
  productId: string;
  productTitle: string;
  className: string;
  children?: ReactNode;
  disabled?: boolean;
}

export const DeleteProductButton = ({ productId, productTitle, className, children, disabled = false }: DeleteProductButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;

    cancelButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isDeleting) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isDeleting, isOpen]);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const result = await deleteProduct(productId);

      if (!result.success) {
        throw new Error(result.message);
      }

      toast.success("Producto eliminado correctamente");
      setIsOpen(false);
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo eliminar el producto");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label={`Eliminar ${productTitle}`}
        disabled={disabled || isDeleting}
        onClick={() => setIsOpen(true)}
        className={className}
      >
        {children ?? <FiTrash2 className="size-3.5" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/50 p-4"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget && !isDeleting) {
                setIsOpen(false);
              }
            }}
          >
            <motion.div
              role="alertdialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 id={titleId} className="text-lg font-semibold text-slate-950">
                    ¿Eliminar producto?
                  </h2>
                  <p id={descriptionId} className="mt-2 text-sm leading-6 text-slate-600">
                    Se eliminará <span className="font-semibold text-slate-950">{productTitle}</span> y sus imágenes. Esta acción no se puede deshacer.
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Cerrar confirmación"
                  disabled={isDeleting}
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer rounded-lg p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FiX className="size-5" />
                </button>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  ref={cancelButtonRef}
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleDelete}
                  className="cursor-pointer inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isDeleting && <FiLoader className="size-4 animate-spin" />}
                  {isDeleting ? "Eliminando..." : "Eliminar producto"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
