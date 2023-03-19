import { IProductEntrance } from "./product.interface";

export interface IImage {
  id_image: string;
  title: string;
  url: string;
  main: boolean;
  product?: IProductEntrance;
}

export interface ISaveImage {
  title: string;
  image: File;
  main: boolean;
}
