import { IEmployee } from "@/models/employee.interface";
import { IRole } from "@/models/role.interface";
import { employeeService } from "@/services/employee.service";
import { roleService } from "@/services/role.service";
import { EmployeeFormSchema } from "@/validations/employee.validation";
import { Field, Formik, FormikHelpers, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import FormErrorMessage from "../styled-component/forms/FormErrorMessage";
import InputText from "../styled-component/forms/InputText";
import SubmitButton from "../styled-component/forms/SubmitButton";
import FormStyled from "./styled-components/FomStyled";

export interface FormInterface {
  type: string;
  title: string;
  data: IEmployee;
  handleCloseModal: () => void;
  getEmployees: () => Promise<void>;
}

export const Form: React.FC<FormInterface> = ({
  type = "CREATE",
  title,
  data,
  handleCloseModal,
  getEmployees,
}) => {
  // const { postLocal, putLocal, selectedLocal } = useContext(LocalContext);

  const [roles, setRoles] = useState<IRole[] | null>(null);
  const handleGetRoles = async () => {
    setRoles((await roleService.getAll()).data);
  };

  useEffect(() => {
    handleGetRoles();
  }, []);

  const handleSubmit = async (
    values: IEmployee,
    helpers: FormikHelpers<IEmployee>
  ) => {
    // console.log("Hola como estas");
    console.log(values);

    if (type === "CREATE") {
      await employeeService
        .create(values)
        .then((res) => {
          helpers.setSubmitting(false);
          handleCloseModal();
          getEmployees();
          Swal.fire({
            text: `${title} registrado con éxito`,
            icon: "success",
          });
        })
        .catch((err) => {
          helpers.setSubmitting(false);
          Swal.fire({
            text: "Ocurrio un error al enviar la información",
            icon: "error",
          });
        });
    } else if (type === "UPDATE") {
      const idEmployee = values.id_employee ? values.id_employee : "";
      if (!idEmployee) return;

      await employeeService
        .update(values, idEmployee)
        .then((res) => {
          helpers.setSubmitting(false);
          handleCloseModal();
          getEmployees();
          Swal.fire({
            text: `${title} actualizado con éxito`,
            icon: "success",
          });
        })
        .catch((err) => {
          helpers.setSubmitting(false);
          Swal.fire({
            text: "Ocurrio un error al enviar la información",
            icon: "error",
          });
        });
    }
  };

  return (
    <Formik
      initialValues={data}
      validationSchema={EmployeeFormSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        values,
        errors,
        setFieldValue,
        handleChange,
      }: FormikProps<IEmployee>) => (
        <FormStyled className="d-flex flex-column gap-4 py-5 px-5">
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="names" className="fw-semibold pb-2">
                  Nombre
                </label>
                <InputText
                  id="names"
                  type="text"
                  name="names"
                  placeholder="Escriba el nombre"
                />
                <FormErrorMessage name="names" component={"p"} />
              </div>
              <div className="mb-3">
                <label htmlFor="first_lastname" className="fw-semibold pb-2">
                  Apellido paterno
                </label>
                <InputText
                  type="text"
                  name="first_lastname"
                  placeholder="Escriba su apellido paterno"
                />
                <FormErrorMessage name="first_lastname" component={"p"} />
              </div>
              <div className="mb-3">
                <label htmlFor="second_lastname" className="fw-semibold pb-2">
                  Apellido materno
                </label>
                <InputText
                  type="text"
                  name="second_lastname"
                  placeholder="Escriba su apellido materno"
                />
                <FormErrorMessage name="second_lastname" component={"p"} />
              </div>
              <div className="mb-3">
                <label htmlFor="dni" className="fw-semibold pb-2">
                  Dni
                </label>
                <InputText
                  type="text"
                  name="dni"
                  placeholder="Escriba su apellido materno"
                />
                <FormErrorMessage name="dni" component={"p"} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="phone_number" className="fw-semibold pb-2">
                  Telefono
                </label>
                <InputText
                  type="text"
                  name="phone_number"
                  placeholder="Escriba su apellido materno"
                />
                <FormErrorMessage name="phone_number" component={"p"} />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="fw-semibold pb-2">
                  Correo electronico
                </label>
                <InputText
                  type="text"
                  name="email"
                  placeholder="Escriba su apellido materno"
                />
                <FormErrorMessage name="email" component={"p"} />
              </div>
              <div className="mb-3">
                <label htmlFor="date_birth" className="fw-semibold pb-2">
                  Fecha de nacimiento
                </label>
                <InputText
                  type="date"
                  name="date_birth"
                  placeholder="Escriba su fecha de nacimiento"
                />
                <FormErrorMessage name="date_birth" component={"p"} />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="fw-semibold pb-2">
                  Rol
                </label>
                <Field name="id_role" as="select" className="form-select p-3">
                  <option value="">-- Selecciona una rol --</option>
                  {roles?.map((rol) => (
                    <option key={rol.id_role} value={rol.id_role}>
                      {rol.title}
                    </option>
                  ))}
                </Field>
                <FormErrorMessage name="id_role" component={"p"} />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <SubmitButton type="submit" disabled={isSubmitting}>
              Registrar
            </SubmitButton>
          </div>
        </FormStyled>
      )}
    </Formik>
  );
};
