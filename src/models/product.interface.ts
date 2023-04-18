import { IBrand } from "./brand.interface";
import { ICategory } from "./category.interface";
import { IShortImage } from "./image.interface";

export interface IGetAllProducts {
  totalPages: number;
  actualPage: number;
  nextPage?: number;
  prevPage?: number;
  data: IProduct[];
}

export interface IProductWithImages {
  id_product?: string;
  name: string;
  images: IShortImage[];
}

export interface IProduct {
  id_product?: string;
  name: string;
  size: string;
  color: string;
  price: string;
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

export enum SearchByEnum {
  NAME = "name",
  SKU = "sku",
}

export interface IProductEntrance {
  id_product: string;
  name: string;
}
