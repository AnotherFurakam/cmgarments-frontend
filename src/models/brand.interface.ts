
import { IProduct } from "./product.interface";

export interface IBrand{
    id_brand?: string,
    name: string,
    createAt: string
}

export interface IGetAllBrand {
  totalPages: number;
  actualPage: number;
  nextPage?: number;
  prevPage?: number;
  data: IBrand[];
}