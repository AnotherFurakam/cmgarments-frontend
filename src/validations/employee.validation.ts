import { ICategory } from "@/models/category.interface";
import * as Yup from "yup";

export const EmployeeFormSchema = Yup.object()
  .shape({
    names: Yup.string()
      .required("Debe llenar el campo Nombres")
      .min(3, "3 caracteres como mínimo")
      .max(50, "50 caracteres como máximo"),
    first_lastname: Yup.string()
      .required("Debe llenar el campo apellido paterno")
      .min(3, "3 caracteres como mínimo")
      .max(50, "50 caracteres como máximo"),
    second_lastname: Yup.string()
      .required("Debe llenar el campo apellido materno")
      .min(3, "3 caracteres como mínimo")
      .max(50, "50 caracteres como máximo"),
    dni: Yup.string()
      .required("Debe llenar el campo dni")
      .min(8, "8 caracteres como mínimo")
      .max(8, "8 caracteres como máximo"),
    phone_number: Yup.string()
      .required("Debe llenar el campo telefono")
      .min(9, "9 caracteres como mínimo")
      .max(9, "9 caracteres como máximo"),
    email: Yup.string()
      .required("Debe llenar el campo email")
      .email("Debe ser un emali válido")
      .min(15, "15 caracteres como mínimo")
      .max(35, "35 caracteres como máximo"),
    date_birth: Yup.string()
      .required("Debe llenar el campo Fecha de nacimiento"),
      
    id_role: Yup.string()
      .required("Debe llenar el campo Rol")
  })
  .optional();
