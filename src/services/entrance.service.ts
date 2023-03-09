import Api from "@/config/Api";
import { IEntrance, IGetEntrance } from "@/models/entrance.interface";
import { IGetAll } from "@/models/global.interface";

//? crear ENTRADA
const create = async (body: IEntrance): Promise<IEntrance> => {
  return await Api.post("/entrance", body);
};

//? obtener ENTRADA
const getAll = async (page = 1, limit = 8): Promise<IGetAll<IGetEntrance>> => {
  const res = await Api.get(`/entrance?limit=${limit}&page=${page}`);
  return res.data;
};

//? actualizar ENTRADA
const update = async (body: IEntrance, id: string): Promise<IEntrance> => {
  return await Api.put(`/entrance/${id}`, body);
};

//? eliminar ENTRADA
const _delete = async (id: string): Promise<IEntrance> => {
  return await Api.delete(`/entrance/${id}`);
};

const entranceService = {
  create,
  getAll,
  update,
  delete: _delete,
};

export { entranceService };
