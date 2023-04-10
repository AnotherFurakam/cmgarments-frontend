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

// desde aca
export interface IGetPurchase {
  create_at: Date;
  date_purchase: Date;
  description: string;
  id_purchase: string;
  id_supplier: IDSupplier;
  nro: number;
  purchase_detail: IPurchaseDetail[];
  total_price: string;
}

interface IDSupplier {
  address: string;
  id_supplier: string;
  name: string;
  phone: string;
  ruc: string;
}

export interface IPurchaseDetail {
  id_product: IDProduct;
  id_purchase_detail: string;
  price: string;
  units: number;
  received: boolean;
}

interface IDProduct {
  brand: Brand;
  category: Category;
  color: string;
  name: string;
}

interface Brand {
  id_brand: string;
  name: string;
}

interface Category {
  id_category: string;
  name: string;
}
