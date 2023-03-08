
import * as Yup from "yup";

export const SupplierFormSchema = Yup.object()
  .shape({
    name: Yup.string()
      .required("Debe llenar el campo Nombres")
      .min(3, "3 caracteres como mínimo")
      .max(50, "50 caracteres como máximo"),
    description: Yup.string()
      .required("Debe llenar el campo descripción")
      .min(3, "3 caracteres como mínimo")
      .max(150, "150 caracteres como máximo"),
    address: Yup.string()
      .required("Debe llenar el campo dirección")
      .min(3, "3 caracteres como mínimo")
      .max(50, "50 caracteres como máximo"),
    phone: Yup.string()
      .required("Debe llenar el campo telefono")
      .min(9, "9 caracteres como mínimo")
      .max(9, "9 caracteres como máximo"),
    ruc: Yup.string()
      .required("Debe llenar el campo ruc")
      .min(11, "11 caracteres como mínimo")
      .max(11, "11 caracteres como máximo"),
  })
  .optional();
