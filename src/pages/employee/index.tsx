import BaseLayout from "@/components/BaseLayout";
import { IEmployee } from "@/models/employee.interface";
import React, { useEffect, useState } from "react";
import { employeeService } from "@/services/employee.service";
import { Table } from "@/components/Table";

const colums = {
  names: "Nombre",
  first_lastname: "Apellidos",
  dni: "Dni",
  phone_number: "Telefono",
  email: "Correo electronico",
  state: "Estado",
  role: "Rol",
};

function Employee() {
  const [employees, setEmployees] = useState<IEmployee[] | null>(null);

  useEffect(() => {
    const getEmployees = async (): Promise<void> => {
      const employees = await employeeService.getAll();
      console.log(employees.data);

      setEmployees(employees.data);
    };

    getEmployees();
  }, []);

  return (
    <BaseLayout>
      <div className="bg-main px-4 py-5">
        <div className="bg-white rounded-4">
          <h1 className="fw-bold fs-3 pt-4 px-5">Empleados</h1>
          <div className="py-4 px-5">
            <Table
              data={employees}
              colums={colums}
              crudButtons
              customButton={false}
              customButtonTitle={""}
              customFunction={() => {}}
              editFunction={() => {}}
              deleteFunction={() => {}}
            />
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default Employee;
