import { IBrand } from "./brand.interface";
import { ICategory } from "./category.interface";

export interface IGetAll {
    totalPages: number;
    actualPage: number;
    nextPage?: number;
    prevPage?: number;
    data: IProduct[];
}

export interface IProduct {
    id_product?: string;
    name: string;
    size: string;
    color: string;
    price: number;
    stock: number;
    gender: string;
    description: string;
    state?: boolean;
    stateS?: string;
    brand?: IBrand;
    id_brand?: string;
    category?: ICategory;
    id_category?: string;
    create_at?: string;
}
