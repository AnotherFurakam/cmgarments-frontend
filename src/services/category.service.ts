import Api from "@/config/Api";
import { ICategory } from "@/models/category.interface";
import { IGetAll } from "@/models/global.interface";

//? crear CATEGORIA
const create = async (body: ICategory): Promise<ICategory> => {
  return await Api.post("/category", body);
};

//? obtener CATEGORIAS
const getAll = async (page = 1): Promise<IGetAll<ICategory>> => {
  const res = await Api.get(`/category?limit=${8}&page=${page}`);
  return res.data;
};

//? actualizar CATEGORIA
const update = async (body: ICategory, id: string): Promise<ICategory> => {
  return await Api.put(`/category/${id}`, body);
};

//? eliminar CATEGORIA
const _delete = async (id: string): Promise<ICategory> => {
  return await Api.delete(`/category/${id}`);
};

const category = {
  create,
  getAll,
  update,
  delete: _delete,
};

export { category };
