import { ICategory } from "@/models/category.interface";
import * as Yup from "yup";

export const EmployeeFormSchema = Yup.object()
  .shape({
    names: Yup.string()
      .required("Debe llenar el campo Nombres")
      .min(4, "4 caracteres como mínimo")
      .max(20, "20 caracteres como máximo"),
    first_lastname: Yup.string()
      .required("Debe llenar el campo apellido paterno")
      .min(4, "4 caracteres como mínimo")
      .max(20, "20 caracteres como máximo"),
    second_lastname: Yup.string()
      .required("Debe llenar el campo apellido materno")
      .min(4, "4 caracteres como mínimo")
      .max(20, "20 caracteres como máximo"),
    dni: Yup.string()
      .required("Debe llenar el campo dni")
      .min(8, "4 caracteres como mínimo")
      .max(8, "20 caracteres como máximo"),
    phone_number: Yup.string()
      .required("Debe llenar el campo telefono")
      .min(4, "4 caracteres como mínimo")
      .max(20, "20 caracteres como máximo"),
    email: Yup.string()
      .required("Debe llenar el campo email")
      .min(4, "4 caracteres como mínimo")
      .max(50, "20 caracteres como máximo"),
    date_birth: Yup.string()
      .required("Debe llenar el campo Fecha de nacimiento")
      .min(4, "4 caracteres como mínimo")
      .max(20, "20 caracteres como máximo"),
    id_role: Yup.string()
      .required("Debe llenar el campo Rol")
      .min(4, "4 caracteres como mínimo")
  })
  .optional();
