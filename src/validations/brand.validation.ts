import * as Yup from "yup";

export const BrandFormSchema = Yup.object()
  .shape({
    name: Yup.string()
      .required("Debe llenar el campo Nombre")
      .min(3, "4 caracteres como mínimo")
      .max(20, "20 caracteres como máximo"),
  })
  .optional();
