"use server";

import { getSession } from "@/lib/auth-utils";
import cloudinary from "../lib/cloudinary";

export const getUploadSignature = async () => {
  const session = await getSession();

  if (session?.user.role !== "admin") {
    return {
      success: false as const,
      message: "No tienes permisos para subir imágenes",
    };
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return {
      success: false as const,
      message: "Faltan variables de entorno de Cloudinary"
    };
  }

  const folder = "ecommerce-next/products";
  const allowedFormats = "png,jpg,jpeg,webp";
  const timestamp = Math.round(Date.now() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder,
      allowed_formats: allowedFormats,
    },
    apiSecret,
  );

  return {
    success: true as const,
    data: {
      signature,
      timestamp,
      folder,
      allowedFormats,
      apiKey,
      cloudName,
    },
  };
};