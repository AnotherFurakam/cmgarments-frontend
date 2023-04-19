import Api from "@/config/Api";
import { IGetAll } from "@/models/global.interface";
import { IImage, ISaveImage } from "@/models/image.interface";
import {
  IGetAllProducts,
  IProduct,
  SearchByEnum,
} from "@/models/product.interface";

//? crear producto
const create = async (body: IProduct): Promise<IProduct> => {
  return await Api.post("/product", body);
};

//? obtener producto
const getAll = async (page = 1): Promise<IGetAll<IProduct>> => {
  const res = await Api.get(`/product?limit=${8}&page=${page}`);
  return res.data;
};

//? actualizar producto
const update = async (body: IProduct, id: string): Promise<IProduct> => {
  return await Api.put(`/product/${id}`, body);
};

//? eliminar producto
const _delete = async (id: string): Promise<IProduct> => {
  return await Api.delete(`/product/${id}`);
};

//? Obtener imagenes por ID de PRODUCTO
const getImages = async (id: string): Promise<IImage[]> => {
  const res = await Api.get(`/product/${id}/image`);
  return res.data;
};

//? Guardar Imagen por ID de PRODUCTO
const saveImage = async (id: string, data: ISaveImage): Promise<IImage> => {
  const res = await Api.post(`/product/${id}/image`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

//* Buscar producto
const searchProducts = async (text: string, searchBy: SearchByEnum) => {
  const res = await Api.get(
    `/product/search/by?text=${text}&searchBy=${searchBy}`
  );
  return res.data;
};

//* Filtrar producto por fecha
const filterByDateProduct = async (dateStart: string, dateEnd: string) => {
  const res = await Api.get(
    `/product/filter/items?dateStart=${dateStart}&dateEnd=${dateEnd}`
  );
  return res.data;
};

//* Obtener cantidad de productos
const getProductQuantity = async () => {
  const res = await Api.get(`/product/count/quantity`);
  return res.data;
};

//* Obtener cantidad de productos
const getRecentProducts = async (quantity: number) => {
  const res = await Api.get(`/product/recents/items?quantity=${quantity}`);
  return res.data;
};

//? Obtener por Categoría
const getProductsByCategory = async (id: string): Promise<IGetAllProducts> => {
  const res = await Api.get(`/product/category/${id}`);
  return res.data;
};

//? Obtener por Marca
const getProductsByBrand = async (id: string): Promise<IGetAllProducts> => {
  const res = await Api.get(`/product/brand/${id}`);
  return res.data;
};

const productService = {
  create,
  getAll,
  update,
  delete: _delete,
  getImages,
  saveImage,
  searchProducts,
  filterByDateProduct,
  getProductQuantity,
  getRecentProducts,
  getProductsByCategory,
  getProductsByBrand,
};

export { productService };
