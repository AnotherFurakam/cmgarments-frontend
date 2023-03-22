import Api from "@/config/Api";
import {
  IGetAll,
  IPurchaseDetail,
  IPurchaseDetailPost,
} from "@/models/purchase-detail.interface";

//? crear compra
const create = async (body: IPurchaseDetailPost): Promise<IPurchaseDetail> => {
  return await Api.post("/purchase-detail", body);
};

//? obtener compra
const getAll = async (limit = 10, page = 1): Promise<IGetAll> => {
  const res = await Api.get(`/purchase-detail?limit=${limit}&page=${page}`);
  return res.data;
};

//Obtener detalle de compra por id de la comprapra
const getAllByIdPurchase = async (
  id: string | undefined | string[],
  limit = 10,
  page = 1
): Promise<IGetAll> => {
  const res = await Api.get(
    `/purchase-detail/purchase/${id}?limit=${limit}&page=${page}`
  );
  return res.data;
};

//? actualizar compra
const update = async (
  body: IPurchaseDetailPost,
  id: string
): Promise<IPurchaseDetail> => {
  return await Api.put(`/purchase-detail/${id}`, body);
};

// //? eliminar compra
const _delete = async (id: string): Promise<IPurchaseDetail> => {
  return await Api.delete(`/purchase-detail/${id}`);
};

const purchaseDetailService = {
  create,
  getAll,
  update,
  delete: _delete,
  getAllByIdPurchase,
};

export { purchaseDetailService };
