import Api from "@/config/Api";
import { IGetAll, IPurchase } from "@/models/purchase.interface";

//? crear compra
const create = async (body: IPurchase): Promise<IPurchase> => {
  return await Api.post("/purchase", body);
};

//? obtener compra
const getAll = async (limit = 10, page = 1): Promise<IGetAll> => {
  const res = await Api.get(`/purchase?limit=${limit}&page=${page}`);
  return res.data;
};

//? actualizar compra
// const update = async (body: IPurchase, id: string): Promise<IPurchase> => {
//   return await Api.put(`/purchase/${id}`, body);
// };

// //? eliminar compra
// const _delete = async (id: string): Promise<IPurchase> => {
//   return await Api.delete(`/purchase/${id}`);
// };


const purchaseService = {
  create,
  getAll,
  // update,
  // delete: _delete
};

export { purchaseService };
