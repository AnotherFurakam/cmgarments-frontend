import { IProduct } from "./product.interface";

export interface ICategory {
  id_category?: string;
  name: string;
  sizes: string;
  createdAt?: string;
  products: IProduct[];
}
