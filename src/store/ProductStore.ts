import { IGetAllProducts } from "@/models/product.interface";
import {create} from "zustand";
import { devtools } from "zustand/middleware"

export interface ProductsState {
  products: IGetAllProducts|null,
  setProducts: (products: IGetAllProducts) => void
}

export const useProductStore = create<ProductsState,[["zustand/devtools",ProductsState]]>(devtools((set) => (
  {
    products: null,
    setProducts: (products: IGetAllProducts) => {
      set(state => (
        {
          products: products
        }
      ))
    }
  } as ProductsState
)))