import { ICustomer } from "./auth.interface";
import { IProduct } from "./product.interface";

export interface ISale {
    id_sale?: string;
    customer?: ICustomer;
    total_cost: string;
    is_delete: Boolean;
    create_at?: Date;
    sale_detail: ISaleDetail[];
}

export interface ISaleDetail {
    id_sale_detail?: string;
    id_sale: string;
    product: IProduct;
    units: number;
    price: number;
    is_delete: Boolean;
}