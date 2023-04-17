import Api from "@/config/Api";
import { IEmployee } from "@/models/employee.interface";
import { IGetAll } from "@/models/global.interface";

//? crear empleado
const create = async (body: IEmployee): Promise<IEmployee> => {
  return await Api.post("/employee", body);
};

//? obtener empleado
const getAll = async (page = 1): Promise<IGetAll<IEmployee>> => {
  const res = await Api.get(`/employee?limit=${8}&page=${page}`);
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

//* Obtener cantidad de empleados
const getEmployeeQuantity = async () => {
  const res = await Api.get(`/employee/count/quantity`);
  return res.data;
};

const employeeService = {
  create,
  getAll,
  update,
  delete: _delete,
  getEmployeeQuantity,
};

export { employeeService };
