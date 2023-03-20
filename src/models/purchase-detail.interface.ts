import { IProduct } from "./product.interface";
import { IPurchase } from "./purchase.interface";

export interface IGetAll {
  totalPages: number;
  actualPage: number;
  nextPage?: any;
  prevPage?: any;
  data: IPurchaseDetail[];
}

export interface IPurchaseDetail {
  id_purchase_detail?: string;
  units: number;
  total_price: number;
  product?: string;
  purchase?: string;
  id_product?: IProduct;
  id_purchase?: IPurchase;
}
