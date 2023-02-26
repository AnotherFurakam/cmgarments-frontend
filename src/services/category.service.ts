import Api from "@/config/Api";
import { IGetAll, ICategory } from "@/models/category.interface";

//? crear CATEGORIA
const create = async (body: ICategory): Promise<ICategory> => {
  return await Api.post("/category", body);
};

//? obtener CATEGORIAS
const getAll = async (limit = 10, page = 1): Promise<IGetAll> => {
  const res = await Api.get(`/category?limit=${limit}&page=${page}`);
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
