"use client";

import { useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import type { ProductFormValues } from "../../schemas/product-form";
import { ClothingFields } from "./ClothingFields";
import { TechnologyFields } from "./TechnologyFields";

export const CategoryFields = () => {

  const { clearErrors, control, setValue } = useFormContext<ProductFormValues>();
  const category = useWatch({ control, name: "category" });
  const previousCategoryRef = useRef(category);

  useEffect(() => {
    if (previousCategoryRef.current === category) {
      return;
    }

    previousCategoryRef.current = category;

    setValue("sizes", [], { shouldDirty: true });
    setValue("gender", "", { shouldDirty: true });
    setValue("colors", [], { shouldDirty: true });
    setValue("type", "", { shouldDirty: true });
    setValue("brand", "", { shouldDirty: true });
    clearErrors(["sizes", "gender", "colors", "type", "brand"]);
  }, [category, clearErrors, setValue]);

  if (category === "clothes") {
    return <ClothingFields />;
  }

  if (category === "technology") {
    return <TechnologyFields />;
  }

  return null;
};
