export type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  badge?: {
    label: string;
    variant: "success" | "warning";
  };
};
