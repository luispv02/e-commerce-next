"use client";

import type { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSearch } from "react-icons/fi";

export const ProductSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") ?? "";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const search = String(formData.get("search") ?? "").trim();

    const params = new URLSearchParams();
    const category = searchParams.get("category");

    if (category) {
      params.set("category", category);
    }

    if (search) {
      params.set("search", search);
    }

    params.set("page", "1");
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  return (
    <form key={currentSearch} onSubmit={handleSubmit} className="relative w-full max-w-sm">
      <FiSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />

      <input
        type="search"
        name="search"
        placeholder="Buscar productos..."
        defaultValue={currentSearch}
        className="h-10 w-full md:w-80 rounded-full border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none placeholder:text-slate-400 focus:border-slate-400"
      />
    </form>
  );
};