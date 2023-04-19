import { IProduct } from "./product.interface";
import { ISupplier } from "./supplier.interface";

export interface IGetAll {
    totalPages: number;
    actualPage: number;
    nextPage?: number;
    prevPage?: number;
    data: IProductSupplier[];
}
export interface IProductSupplier{
    id_productsupplier?: string;
    product?: IProduct;
    id_product?: string;
    supplier?: ISupplier;
    id_supplier?: string;
    unit_cost: number;
    create_at?: string;
}
