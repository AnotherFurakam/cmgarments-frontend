import Api from "@/config/Api";

import { IBrand, IGetAllBrand } from "@/models/brand.interface";


//? crear CATEGORIA
const create = async (body: IBrand): Promise<IBrand> => {
  return await Api.post("/brand", body);
};

//? obtener CATEGORIAS
const getAll = async (page = 1): Promise<IGetAllBrand> => {

  const res = await Api.get(`/brand?limit=${8}&page=${page}`);
  return res.data;
};

//? actualizar CATEGORIA
const update = async (body: IBrand, id: string): Promise<IBrand> => {
  return await Api.put(`/brand/${id}`, body);
};

//? eliminar CATEGORIA
const _delete = async (id: string): Promise<IBrand> => {
  return await Api.delete(`/brand/${id}`);
};

const brand = {
  create,
  getAll,
  update,
  delete: _delete,
};

export { brand };