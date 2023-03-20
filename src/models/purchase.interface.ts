import { ISupplier } from "./supplier.interface";

export interface IGetAll {
  totalPages: number;
  actualPage: number;
  nextPage?: any;
  prevPage?: any;
  data: IPurchase[];
}

export interface IPurchase {
  id_purchase?: string;
  nro?: any;
  description: string;
  total_price: number;
  date_purchase: string;
  supplier?: string;
  id_supplier?: ISupplier;
}
