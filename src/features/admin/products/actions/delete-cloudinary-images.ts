
"use server";

import { getSession } from "@/lib/auth-utils";
import cloudinary from "../lib/cloudinary";

export const deleteCloudinaryImages = async (publicIds: string[]) => {
  const session = await getSession();

  if (session?.user.role !== "admin") return;

  const safeIds = publicIds.filter((id) => id.startsWith("ecommerce-next/products"));

  await Promise.allSettled(
    safeIds.map((id) => cloudinary.uploader.destroy(id)),
  );
};