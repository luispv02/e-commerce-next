import Image from "next/image";

interface CartItemImageProps {
  image?: { url: string };
  title: string;
}

export const CartItemImage = ({ image, title }: CartItemImageProps) => {
  if (!image) return null;

  return (
    <Image
      src={image.url}
      alt={title}
      fill
      sizes="96px"
      className="object-contain"
    />
  );
};