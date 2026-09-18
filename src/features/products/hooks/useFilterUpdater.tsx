
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface UseFilterUpdaterArgs {
  mode?: "desktop" | "mobile";
  draftParams?: URLSearchParams;
  onDraftChange?: (params: URLSearchParams) => void;
}

export const useFilterUpdater = ({ mode = "desktop", draftParams, onDraftChange }: UseFilterUpdaterArgs) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = mode === "mobile" && draftParams ? draftParams : searchParams;

  const updateParams = (newParams: URLSearchParams) => {
    if (mode === "mobile") {
      onDraftChange?.(newParams);
      return;
    }

    const queryString = newParams.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  };

  return { params, updateParams };
};