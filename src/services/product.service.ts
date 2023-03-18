import Api from "@/config/Api";
import { IImage } from "@/models/image.interface";
import { IGetAll, IProduct } from "@/models/product.interface";

//? crear producto
const create = async (body: IProduct): Promise<IProduct> => {
  return await Api.post("/product", body);
};

//? obtener producto
const getAll = async (limit = 10, page = 1): Promise<IGetAll> => {
  const res = await Api.get(`/product?limit=${limit}&page=${page}`);
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

const productService = {
  create,
  getAll,
  update,
  delete: _delete,
  getImages,
};

export { productService };
