interface UploadSignature {
  signature: string;
  timestamp: number;
  folder: string;
  allowedFormats: string;
  apiKey: string;
  cloudName: string;
}

export interface UploadedProductImage {
  url: string;
  publicId: string;
}

export const uploadToCloudinary = async (file: File, signature: UploadSignature): Promise<UploadedProductImage> => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("api_key", signature.apiKey);
  formData.append("timestamp", String(signature.timestamp));
  formData.append("signature", signature.signature);
  formData.append("folder", signature.folder);
  formData.append("allowed_formats", signature.allowedFormats);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Error al subir la imagen");
  }

  const data = await response.json();

  if (!data.secure_url || !data.public_id) {
    throw new Error("Cloudinary no devolvió los datos de la imagen");
  }

  return {
    url: data.secure_url,
    publicId: data.public_id,
  };
};