import { IGetAll } from "@/models/global.interface";
import { IImage, ISaveImage } from "@/models/image.interface";
import { IGetAllProducts, IProduct } from "@/models/product.interface";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface ProductsState {
  products: IGetAll<IProduct> | null;
  images: IImage[] | null;
  setProducts: (products: IGetAll<IProduct>) => void;
  setImages: (images: IImage[]) => void;
}

export const useProductStore = create<
  ProductsState,
  [["zustand/devtools", ProductsState]]
>(
  devtools(
    (set) =>
      ({
        products: null,
        images: null,
        setProducts: (products: IGetAll<IProduct>) => {
          set((state) => ({
            products: products,
          }));
        },
        setImages: (data) => {
          set((state) => ({
            images: data,
          }));
        },
      } as ProductsState)
  )
);
