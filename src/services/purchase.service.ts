import Api from "@/config/Api";
import { IGetAll } from "@/models/global.interface";
import { IGetPurchase, IPurchase } from "@/models/purchase.interface";

//? crear compra
const create = async (body: IPurchase): Promise<IPurchase> => {
  return await Api.post("/purchase", body);
};

//? obtener compra
const getAll = async (page = 1): Promise<IGetAll<IPurchase>> => {
  const res = await Api.get(`/purchase?limit=${8}&page=${page}`);
  return res.data;
};

//? actualizar compra
const update = async (body: IPurchase, id: string): Promise<IPurchase> => {
  return await Api.put(`/purchase/${id}`, body);
};

//? eliminar compra
const _delete = async (id: string): Promise<IPurchase> => {
  return await Api.delete(`/purchase/${id}`);
};

//? obtener ENTRADA
const getByNumber = async (nro: number): Promise<IGetPurchase> => {
  const res = await Api.get(`/purchase/number/${nro}`);
  return res.data;
};

const purchaseService = {
  create,
  getAll,
  update,
  delete: _delete,
  getByNumber,
};

export { purchaseService };
