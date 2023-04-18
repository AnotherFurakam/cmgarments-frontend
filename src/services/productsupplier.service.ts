import Api from "@/config/Api";
import { IGetAll, IProductSupplier } from "@/models/productsupplier.interface";

//? crear producto
const create = async (body: IProductSupplier): Promise<IProductSupplier> => {
    return await Api.post("/productsupplier", body);
};

//? obtener producto
const getAll = async (limit = 10, page = 1): Promise<IGetAll> => {
    const res = await Api.get(`/productsupplier?limit=${limit}&page=${page}`);
    return res.data;
};

//? actualizar producto
const update = async (body: IProductSupplier, id: string): Promise<IProductSupplier> => {
    return await Api.put(`/productsupplier/${id}`, body);
  };
  
  //? eliminar producto
  const _delete = async (id: string): Promise<IProductSupplier> => {
    return await Api.delete(`/productsupplier/${id}`);
  };
  
  
  const productSupplierService = {
    create,
    getAll,
    update,
    delete: _delete
  };
  
  export { productSupplierService };