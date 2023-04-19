import Api from "@/config/Api";
import { IGetAll } from "@/models/global.interface";
import { ISupplier } from "@/models/supplier.interface";

//? crear proveedor
const create = async (body: ISupplier): Promise<ISupplier> => {
  return await Api.post("/supplier", body);
};

//? obtener proveedor
const getAll = async (page = 1): Promise<IGetAll<ISupplier>> => {
  const res = await Api.get(`/supplier?limit=${8}&page=${page}`);
  return res.data;
};

//? actualizar proveedor
const update = async (body: ISupplier, id: string): Promise<ISupplier> => {
  return await Api.put(`/supplier/${id}`, body);
};

//? eliminar proveedor
const _delete = async (id: string): Promise<ISupplier> => {
  return await Api.delete(`/supplier/${id}`);
};

//* Obtener cantidad de proveedores
const getSupplierQuantity = async () => {
  const res = await Api.get(`/supplier/count/quantity`);
  return res.data;
};

const supplierService = {
  create,
  getAll,
  update,
  delete: _delete,
  getSupplierQuantity,
};

export { supplierService };
