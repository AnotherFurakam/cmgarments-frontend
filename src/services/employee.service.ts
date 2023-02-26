import Api from "@/config/Api";
import { IGetAll, IEmployee } from "@/models/employee.interface";

//? crear CATEGORIA
const create = async (body: IEmployee): Promise<IEmployee> => {
  return await Api.post("/employee", body);
};

//? obtener CATEGORIAS
const getAll = async (limit = 10, page = 1): Promise<IGetAll> => {
  const res = await Api.get(`/employee?limit=${limit}&page=${page}`);
  return res.data;
};

const employeeService = {
  create,
  getAll,
};

export { employeeService };
