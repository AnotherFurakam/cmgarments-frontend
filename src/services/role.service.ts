import Api from "@/config/Api";
import { IGetAll } from "@/models/role.interface";

//? obtener rol
const getAll = async (limit = 10, page = 1): Promise<IGetAll> => {
  const res = await Api.get(`/role?limit=${limit}&page=${page}`);
  return res.data;
};

const roleService = {
  getAll,
};

export { roleService };
