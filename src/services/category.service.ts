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

const category = {
  create,
  getAll,
};

export { category };
