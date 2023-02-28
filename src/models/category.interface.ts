import { IProduct } from "./product.interface";

export interface IGetAll {
  totalPages: number;
  actualPage: number;
  nextPage?: number;
  prevPage?: number;
  data: ICategory[];
}

export interface ICategory {
  id_category?: string;
  name: string;
  sizes: string;
  createdAt?: string;
  products: IProduct[]
}
