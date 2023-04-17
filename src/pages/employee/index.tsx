import BaseLayout from "@/components/BaseLayout";
import {
  IEmployee,
  IEmployee as IEmployeeS,
} from "@/models/employee.interface";
import React, { useEffect, useState } from "react";
import { employeeService } from "@/services/employee.service";
import { Table } from "@/components/Table";
import Image from "next/image";
import ButtonAddStyle from "@/components/styled-component/ButtonAddStyle";
import { FaPlus } from "react-icons/fa";
import { Modal } from "@/components/Modal";
import { Form } from "@/components/Employee/Form";
import Swal from "sweetalert2";
import { IGetAll } from "@/models/global.interface";
import Pagination from "@/components/Pagination/Pagination";

const colums = {
  names: "Nombre",
  first_lastname: "Apellidos",
  dni: "Dni",
  phone_number: "Telefono",
  email: "Correo electronico",
  state: "Estado",
  role: "Rol",
};

const initialValues: IEmployeeS = {
  names: "",
  first_lastname: "",
  second_lastname: "",
  dni: "",
  phone_number: "",
  email: "",
  date_birth: "",
  state: true,
};

function Employee() {
  const [employees, setEmployees] = useState<IGetAll<IEmployee> | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectEmployee, setSelectEmployee] =
    useState<IEmployeeS>(initialValues);

  const cleanEmployee = (employee: IGetAll<IEmployee>) => {
    const newEmployee: IEmployeeS[] = employee.data.map((e) => {
      const id_employee = e.id_employee;
      const names = e.names;
      const first_lastname = e.first_lastname;
      const second_lastname = e.second_lastname;
      const dni = e.dni;
      const phone_number = e.phone_number;
      const email = e.email;
      const date_birth = e.date_birth;
      const state = e.state ? "Habilitado" : "Deshabilitado";
      const role = e.role?.title;

      return {
        id_employee,
        names,
        first_lastname,
        second_lastname,
        dni,
        phone_number,
        email,
        date_birth,
        state,
        role,
      };
    });

    setEmployees({ ...employee, data: newEmployee });
  };

  // Obtener todos los empleados:
  const getEmployees = async (page: number = 1): Promise<void> => {
    const employees = await employeeService.getAll();
    //console.log(employees.data);

    cleanEmployee(employees);
  };

  //Funcion para cerrar modal
  const handleCloseModal = () => {
    setIsOpenModal(false);
    if (selectEmployee.id_employee) setSelectEmployee(initialValues);
  };

  const handleOpenModal = (): void => {
    setIsOpenModal(true);
  };

  const handleEditLocal = (id: string): void => {
    const employee = employees?.data.find((c) => c.id_employee === id);
    setSelectEmployee(employee || initialValues);
    console.log(employee);

    handleOpenModal();
  };

  const handleDeleteEmployee = async (id: string): Promise<void> => {
    await employeeService
      .delete(id)
      .then((res) => {
        Swal.fire(
          "Eliminado!",
          "El registro fue eliminado con éxito",
          "success"
        );
        getEmployees();
      })
      .catch((err) => {
        Swal.fire({
          text: err.message,
          icon: "error",
        });
      });
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <BaseLayout>
      <div className="bg-main px-4 py-5">
        <div className="bg-white rounded-4">
          <div className="py-4 px-5">
            <div className="d-flex justify-content-between mt-2 mb-4">
              <div className="d-flex align-items-center">
                <Image
                  src="/images/png/employee-select.png"
                  alt="Categoría"
                  width={60}
                  height={60}
                  className="me-3 img-fluid"
                />
                <h1 className="fw-bold fs-3">Empleados</h1>
              </div>
              <div className="d-flex align-items-center">
                <ButtonAddStyle type="button" onClick={handleOpenModal}>
                  <span className="d-d-inline-block me-3">Agregar</span>
                  <FaPlus />
                </ButtonAddStyle>
              </div>
            </div>
            <Table
              data={employees?.data}
              colums={colums}
              crudButtons
              customButton={false}
              customButtonSale={false}
              customButtonTitle={""}
              customFunction={() => {}}
              editFunction={handleEditLocal}
              deleteFunction={handleDeleteEmployee}
            />
            <Pagination
              actualPage={employees?.actualPage}
              nextPage={employees?.nextPage}
              totalPage={employees?.totalPages}
              prevPage={employees?.prevPage}
              getContentFn={getEmployees}
            />
            <Modal
              title="Empleado"
              type={selectEmployee.id_employee ? "UPDATE" : "CREATE"}
              isOpen={isOpenModal}
              handleCloseModal={handleCloseModal}
            >
              <Form
                type={selectEmployee.id_employee ? "UPDATE" : "CREATE"}
                title="Empleado"
                data={selectEmployee}
                handleCloseModal={handleCloseModal}
                getEmployees={getEmployees}
              />
            </Modal>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default Employee;
