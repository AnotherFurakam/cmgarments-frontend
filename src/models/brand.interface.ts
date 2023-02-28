import { IProduct } from "./product.interface";

export interface IGetAll {
    totalPages: number;
    actualPage: number;
    nextPage?: number;
    prevPage?: number;
    data: IBrand[];
}

export interface IBrand{
    id_brand?: string,
    name: string,
    createAt: string,
    productos: IProduct[]
}