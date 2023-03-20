import { IImage, ISaveImage } from "@/models/image.interface";
import { IGetAllProducts } from "@/models/product.interface";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface ProductsState {
  products: IGetAllProducts | null;
  images: IImage[] | null;
  setProducts: (products: IGetAllProducts) => void;
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
        setProducts: (products: IGetAllProducts) => {
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
