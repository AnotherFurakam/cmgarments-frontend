import Api from "@/config/Api";
import { IGetAll } from "@/models/global.interface";
import { ISale, ISaleDetail } from "@/models/sale.interface";

//? obtener SALES
const getAll = async (page = 1): Promise<IGetAll<ISale>> => {
    const res = await Api.get(`/sale?limit=${8}&page=${page}`);
    return res.data;
};

//? obtener SALESDETAIL
const getSaleDetail = async (id: string, page = 1): Promise<IGetAll<ISaleDetail>> => {
    const res = await Api.get(`/sale/detail/${id}?limit=${8}&page=${page}`);
    return res.data;
};

//? eliminar CATEGORIA
const _delete = async (id: string): Promise<ISale> => {
    return await Api.delete(`/sale/${id}`);
};

const SaleService = {
    getSaleDetail,
    getAll,
    delete: _delete,
};

export { SaleService };