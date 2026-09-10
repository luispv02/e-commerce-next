import { Product } from "./product";


export interface ProductsPagination {
  page: number;
  limit: number;
  totalProducts: number;
  totalPages: number;
}

export interface ProductsListResponse {
  ok: boolean;
  data: {
    pagination: ProductsPagination;
    products: Product[];
  };
}

export interface ProductResponse {
  ok: boolean;
  product: Product;
}