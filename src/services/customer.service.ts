import Api from "@/config/Api";

import { ICustomer } from "@/models/customer.interface";
import { IGetAll } from "@/models/global.interface";

//? crear CATEGORIA
const create = async (body: ICustomer): Promise<ICustomer> => {
  return await Api.post("/customer", body);
};

//? obtener CATEGORIAS
const getAll = async (page = 1): Promise<IGetAll<ICustomer>> => {
  const res = await Api.get(`/customer?limit=${8}&page=${page}`);
  return res.data;
};

//? actualizar CATEGORIA
const update = async (body: ICustomer, id: string): Promise<ICustomer> => {
  return await Api.put(`/customer/${id}`, body);
};

//? eliminar CATEGORIA
const _delete = async (id: string): Promise<ICustomer> => {
  return await Api.delete(`/customer/${id}`);
};

const customerService = {
  create,
  getAll,
  update,
  delete: _delete,
};

export { customerService };
