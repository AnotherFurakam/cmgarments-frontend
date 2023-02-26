import Api from "@/config/Api";
import { IGetAll, IEmployee } from "@/models/employee.interface";

//? crear empleado
const create = async (body: IEmployee): Promise<IEmployee> => {
  return await Api.post("/employee", body);
};

//? obtener empleado
const getAll = async (limit = 10, page = 1): Promise<IGetAll> => {
  const res = await Api.get(`/employee?limit=${limit}&page=${page}`);
  return res.data;
};

//? actualizar empleado
const update = async (body: IEmployee, id: string): Promise<IEmployee> => {
  return await Api.put(`/employee/${id}`, body);
};

//? eliminar empleado
const _delete = async (id: string): Promise<IEmployee> => {
  return await Api.delete(`/employee/${id}`);
};


const employeeService = {
  create,
  getAll,
  update,
  delete: _delete
};

export { employeeService };
