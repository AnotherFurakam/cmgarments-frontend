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
  price: number;
  product?: string;
  purchase?: string;
  id_product?: IProduct;
  id_purchase?: IPurchase;
}

export interface IPurchaseDetailPost {
  id_purchase_detail?: string;
  units: number;
  price: number;
  id_product?: string;
  id_purchase?: string;

}